const axios = require ("axios");
const PLANTLIST_URL = "https://perenual.com/api/species-list";
const apiKey = process.env.API_KEY;


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
}

module.exports = PlantListModel;

