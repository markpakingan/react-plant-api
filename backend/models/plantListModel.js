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
      console.err("Cant Fetch All Plants from Models", err);
    }
  }

  static async getPlantDetails(id) {
    try {
      const response = await axios.get(
        `https://perenual.com/api/species/details/${id}?key=${apiKey}`
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

  // This will fetch all created plant group in the PSQL Table
  static async getAllPlantGroup() {
    const query = "SELECT * FROM My_Plant_Group";
    const result = await db.query(query);
    console.log("Here's the result", result.rows);
    return result.rows;
  }

  
  static async deletePlantGroup(handle) {
    const result = await db.query(
      `DELETE FROM My_Plant_Group WHERE group_name = $1 RETURNING group_name`, [handle]
    );

    const plant = result.rows[0];


    if (!plant) throw new NotFoundError(`No PlantGroup: ${handle}`);

    return plant;
  };


  static async updatePlantGroupDetails(groupName, description, groupId) {
    const query = "UPDATE My_Plant_Group SET group_name = $1, description = $2 WHERE my_plant_group_id = $3";
    await db.query(query, [groupName, description, groupId]);
  }



  static async getPlantGroupDetails(groupId) {
    const query = "SELECT * FROM My_Plant_Group WHERE my_plant_group_id = $1";
    const result = await db.query(query, [groupId]);

    if (result.rows.length === 0) {
      throw new NotFoundError(`No PlantGroup found with name: ${groupId}`);
    }
  
    return result.rows[0];
  
  }
}


module.exports = PlantListModel;