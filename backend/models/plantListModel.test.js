const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const PlantListModel = require("./plantListModel.js");
const request = require('supertest');
const app = require("../app.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
  } = require("./_testCommon.js");

  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);

/************************************** create */

describe("API /plantlist ", () => {


    const urlResponse = {
  data: [
    {
      id: 1,
      common_name: "Rose",
      plant_true_id: 241,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    },
    {
      id: 2,
      common_name: "Cactus",
      plant_true_id: 100,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    },
    {
      id: 3,
      common_name: "Sunflower",
      plant_true_id: 43,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    }
  ]
};


test("/GET a list of plants", async()=> {

    const user = {
        id: 1, 
        username: 'testuser', 
      };

    const token = jwt.sign(user, SECRET_KEY);

    const resp = await request(app)
    .get('/plantlist')
    .set('Authorization', `Bearer ${token}`); // Add the JWT token here

    expect(resp.statusCode).toBe(200);


})

test("/POST - add the plant details", async ()=> {
    const plant = {
        plant_true_id: 79,
        common_name: "Japanese Rose", 
        group_id: 1, 
        user_id: 1
    };

    const token = jwt.sign(plant, SECRET_KEY);

    const resp = await request(app)
    .post("/plantlist/add-plant-to-group")
    .set("Authorization", ` Bearer ${token}`);

    expect(resp.statusCode).toBe(201);

})


  });

// ****************************************************************

describe ("CRUD PlantGroup", ()=> {
    const newPlantGroup = {
        my_plant_group_id: 5, 
        group_name: "Rainy Plants",
        description: "List of rainy plants",
        user_id: 1
    };

    const existingPlantGroup = {
        my_plant_group_id: 1, 
        group_name: "Dessert Plants",
        description: "list of dessert plants",
        user_id: 1
    };


    test("/POST - createPlantGroup", async()=> {

        try{
        await PlantListModel.createPlantGroup(newPlantGroup);

        const query =  "SELECT * FROM My_Plant_Group WHERE group_name = $1 ";
        const result = await db.query(query, [newPlantGroup.group_name]);

        expect(newPlantGroup).toEqual(result.rows[0]);

        }catch(err){
            console.error(err);
        }
    });


    test("/GET - getAllPlantGroup", async()=> {

        const user_id = 1; 

        try{
            let plantList = await PlantListModel.getAllPlantGroup(user_id);
            const existingPlantList =  await db.query("SELECT * FROM My_Plant_Group WHERE user_id = 1");

            expect(plantList).toEqual(existingPlantList);

        }catch(err){
            console.error(err)
        }
    });

    test("/DELETE - deletePlantGroup", async()=> {
        
        try{
            
            await PlantListModel.deletePlantGroup(existingPlantGroup.group_name);

            const result = await db.query(`SELECT * FROM My_Plant_Group WHERE group_name = ${existingPlantGroup.group_name}`);
            const plant = result.rows[0];

            expect(plant).toEqual(0);

        }catch(err){
            console.error(err)
        }
    });

    test("/UPDATE - updatePlantGroupDetails", async()=>{
        try{

            const updatedPlantGroup = {
                my_plant_group_id: 1, 
                group_name: "Dessert Pineapple Plants",
                description: "list of dessert plants",
                user_id: 1
            };

        
            await PlantListModel.updatedPlantGroup(updatedPlantGroup);

            const result = await db.query("SELECT * FROM My_Plant_Group WHERE group_name = 'Dessert Pineapple Plants'");

            expect(result.rows[0]).toEqual(updatedPlantGroup);

        }catch(err){
            console.error("test failed:", err)
        }
    })
})


// ****************************************************************
describe("CRUD plantreview", ()=> {

    test("/GET getAllPlantReview", async()=> {

        const user_id = 1;

        let plantReviews = await PlantListModel.getAllPlantReview(user_id);

        const result = await db.query(`SELECT * FROM plant_group_plants_review WHERE user_id = ${user_id}`);

        expect(result.rows).toEqual(plantReviews);
    });


    test("/DELETE - deletePlantReview", async()=> {

        const my_plant_group_id = 4;

        await PlantListModel.deletePlantReview(my_plant_group_id);

        const result = await db.query(`SELECT * FROM plant_group_plants_review WHERE my_plant_group_id = ${my_plant_group_id}`);

        expect(result.rows.length).toEqual(0);

        
    })

})

