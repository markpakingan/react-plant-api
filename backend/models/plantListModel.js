const axios = require("axios");
const PLANTLIST_URL = "https://perenual.com/api/species-list";
const apiKey = process.env.API_KEY;

const db = require("../db");
const { NotFoundError } = require("../expressError");

class PlantListModel {

  // *****************************************************************************
  // FOR PLANTLIST

  static async getAllPlants() {
    try {
      const response = await axios.get(`${PLANTLIST_URL}?key=${apiKey}`);
      return response.data;
    } catch (err) {
      console.error("Cant Fetch All Plants from Models", err);
    }
  } 

  static async getPlantDetails(plant_true_id) {
    try {
      const response = await axios.get(
        `https://perenual.com/api/species/details/${plant_true_id}?key=${apiKey}`
      );
      return response.data;
    } catch (err) {
      console.error("Can't fetch Plant Details from Models", err);
    }
  };

  // adds the plantDetails to the PlantGroup DB
  static async addPlantDetails(plant_true_id, common_name, group_id){
    try{

      const query = 
        "INSERT INTO my_plant_group_plants (plant_true_id, common_name, group_id) VALUES ($1, $2, $3) RETURNING *";
      
      const result = await db.query(query, [plant_true_id, common_name, group_id]);
      return result;

    }catch(err){
      console.error("Failed to add plantdetails (model)", err)
    }
  }


  // *****************************************************************************
  // FOR PLANTGROUP

  static async createPlantGroup({ groupName, description, user_id }) {
    try {
      // Insert data into the My_Plant_Group table
      const query =
        "INSERT INTO My_Plant_Group (group_name, description, user_id) VALUES ($1, $2, $3)";
      const result = await db.query(query, [groupName, description, user_id]);
      return result;
    } catch (err) {
      console.error("createPlant Error", err);
      throw err;
    }
  }

  // This will fetch all created plant group in the PSQL Table ONLY by the user;
  static async getAllPlantGroup(user_id) {
    const query = "SELECT * FROM My_Plant_Group WHERE user_id = $1";
    const result = await db.query(query, [user_id]);
    return result.rows;
  }


  
  static async deletePlantGroup(group_name) {
    const query = 
      `DELETE FROM My_Plant_Group WHERE group_name = $1 RETURNING group_name`;
    
    const result = await db.query(query, [group_name])

    const plant = result.rows[0];
    if (!plant) throw new NotFoundError(`No PlantGroup: ${group_name}`);

    return plant;
  };


  static async updatePlantGroupDetails(groupName, description, groupId) {
    const query = "UPDATE My_Plant_Group SET group_name = $1, description = $2 WHERE my_plant_group_id = $3";
    await db.query(query, [groupName, description, groupId]);
  }



  static async getPlantGroupDetails(my_plant_group_id) {
    const query = "SELECT * FROM My_Plant_Group WHERE my_plant_group_id = $1";
    const result = await db.query(query, [my_plant_group_id]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`No PlantGroup found with ID: ${groupId}`);
    }
  
    return result.rows[0];
  
  }


  // *****************************************************************************
  // FOR PLANT REVIEW

  static async createPlantReview({my_plant_group_id, user_id, rating, review}){

    try {
      // Insert data into the plant_group_plants_review

      // Parse values to integers
      my_plant_group_id = parseInt(my_plant_group_id, 10);
      user_id = parseInt(user_id, 10);
      rating = parseInt(rating, 10);


      const query =
        "INSERT INTO Plant_Group_Plants_Review (my_plant_group_id, user_id, rating, review) VALUES ($1, $2, $3, $4)"
      const result = await db.query(query, [my_plant_group_id, user_id, rating, review]);
      return result;
    } catch (err) {
      console.error("createPlant Error", err);
      throw err;
    }

  }

  static async getAllPlantReview(user_id){
    
    try{

      const query = "SELECT * FROM Plant_Group_Plants_Review WHERE user_id = $1";
      const result = await db.query(query, [user_id]);
  
      if (result.rows.length === 0) {
        throw new NotFoundError(`No Plant Review found with name: ${user_id}`);
      }
    
      return result.rows;
  
    }catch(err){
      console.error("failed to get reviews from model", err)
    }
  }


  // static async deletePlantGroup(handle) {
  //   const result = await db.query(
  //     `DELETE FROM My_Plant_Group WHERE group_name = $1 RETURNING group_name`, [handle]
  //   );
  
  //   const plant = result.rows[0];
  
  
  //   if (!plant) throw new NotFoundError(`No PlantGroup: ${handle}`);
  
  //   return plant;
  // };

  
  static async deletePlantReview(my_plant_group_id){
    try{
      const query = `DELETE FROM Plant_Group_Plants_Review WHERE my_plant_group_id = $1 
      RETURNING my_plant_group_id`

      const result = await db.query(query, [my_plant_group_id]);
      const plantReview = result.rows[0];

      if (!plantReview) throw new NotFoundError(`No Plant Review: ${my_plant_group_id}`);
      
      return plantReview;

    }catch(err){
      console.error("failed to delete plant review in model", err);
      throw err;
    }
  }
}


module.exports = PlantListModel;



