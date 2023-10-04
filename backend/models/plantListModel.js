const axios = require ("axios");
const PLANTLIST_URL = "https://perenual.com/api/species-list";
const apiKey = process.env.API_KEY;

const db = require("../db");


class PlantListModel {
    static async getAllPlants() {
        try{
            const response = await axios.get(`${PLANTLIST_URL}?key=${apiKey}`);
            return response.data;
        }catch(err){
            console.err("Cant Fetch All Plants from Models",err)
        }
    }


    static async getPlantDetails(id) {

        try{
            const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=${apiKey}`);
            return response.data;
            
        }catch(err){
            console.error("Can't fetch Plant Details from Models",err)
        }
    }

    // Transfers info from Plant Group Form to Plant Group Table



    // my_plant_group_id 
    // groupName
    // description



    static async createPlantGroup({groupName, description}) {
        try {
            // Insert data into the My_Plant_Group table
            const query = 'INSERT INTO My_Plant_Group (group_name, description) VALUES ($1, $2)';
            const result = await db.query(query, [groupName, description]);
            return result; 

        } catch (err) {
            console.error('createPlant Error', err);
            throw err;
        }
    }
    
}

module.exports = PlantListModel;

