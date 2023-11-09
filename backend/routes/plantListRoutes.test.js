"use strict";


const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const request = require('supertest');
const app = require("../app.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("../models/_testCommon");
  
  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);
  
/***************************************/


describe("PlantList Test", ()=> {
    
    
    test("/GET a list of plants randomly", async()=> {
    
        const user = {
            id: 1, 
            username: 'testuser', 
          };
    
        const token = jwt.sign(user, SECRET_KEY);
    
        const resp = await request(app)
        .get('/plantlist')
        .set('Authorization', `Bearer ${token}`); 
    
        expect(resp.statusCode).toBe(200);
    
    
    });


    // test("/POST - add the plant details", async ()=> {
    //     const plant = {
    //         plant_true_id: 79,
    //         common_name: "Japanese Rose", 
    //         group_id: 1, 
    //         user_id: 1
    //     };

    //     const token = jwt.sign(plant, SECRET_KEY);

    //     const resp = await request(app).post("/plantlist/add-plant-to-group").send("fakedata").set("Authorization", ` Bearer ${token}`)

    //     expect(resp.statusCode).toBe(201);

    // });


    test("/GET - searchform", async()=> {


        const user = {
            id: 1, 
            username: 'testuser', 
          };
    
        const token = jwt.sign(user, SECRET_KEY);

        const query = "rose";

            const resp = await request(app)
            .get(`/plantlist/search?query=${query}`)
            .set('Authorization', `Bearer ${token}`);

            expect(resp.statusCode).toBe(200);

    })

});


describe("PLANTLIST GROUP TEST", ()=> {

    // test("/POST - create plant group /group/create", async()=> {

    //     const newPlant = {
    //         groupName: "Rainy Plants",
    //         description: "list of rainy plants",
    //         user_id: 1, 
    //         username: "1user"
    //     }

    //     const token = jwt.sign(newPlant, SECRET_KEY);

    //     const resp = await request(app)
    //     .post("/plantlist/group/create")
    //     .send(newPlant).set('Authorization', `Bearer ${token}`);

    //     expect(resp.statusCode).toBe(201)

    // });

    test("/GET - fetch all plant per group", async()=> {

        const user = {
            id: 1, 
            username: "testuser", 
          };

        const token = jwt.sign(user, SECRET_KEY);

        const resp = await request(app)
        .get(`/plantlist/fetch-all-plant-per-group/1?username=testuser`)
        .set('Authorization', `Bearer ${token}`)

        expect(resp.statusCode).toBe(200)

    })


    test("/DELETE - delete a group name", async () => {
        const user = {
            id: 1,
            username: "testuser",
        };
    
        const token = jwt.sign(user, SECRET_KEY);
    
        const group_name = "Dessert Plants";
        const username = "testuser";
    
        const resp = await request(app)
            .delete(`/plantlist/${group_name}`)
            .query({ username: username })
            .set('Authorization', `Bearer ${token}`);
    
        expect(resp.statusCode).toBe(200);
    });
    

    test("/PATCH - update a group", async()=>{

        const updatedGroupName = {
            groupName: "Dessert Plants",
            description: "List of Amazing Dessert Plants!",
            groupId: 1
        };

        const user = {
            id: 1,
            username: "testuser",
        };


        const token = jwt.sign(user, SECRET_KEY);

        const resp = await request(app)
        .put(`/plantlist/group/update/1`)
        .query({ username: user.username })
        .set('Authorization', `Bearer ${token}`)
        .send(updatedGroupName);

        expect(resp.statusCode).toBe(200);

    })


})




