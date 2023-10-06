// plantListRoutes.js file

const express = require("express");
const router =  new express.Router();
const axios = require("axios");
const jsonschema = require("jsonschema")
const {BadRequestError} = require("../expressError")
const PlantListModel = require("../models/plantListModel")

const planListSchema = require("../schemas/plantListSchema.json")
const apiKey = process.env.API_KEY;

const PLANTLIST_URL = "https://perenual.com/api/species-list"

const cors = require("cors");
router.use(cors());




router.get("/", async (req, res) => {
    try{
        const plants = await PlantListModel.getAllPlants();
        res.json({plant: plants})
    }catch(err){
        console.error(err)
    }
});

router.get("/:id", async (req, res) => {
        try{
                const id = req.params.id;
                const plantDetails = await PlantListModel.getPlantDetails(id);
                res.json({plant:plantDetails})
        }catch(err){
                console.error(err)
        }
})

// this is for the search form
router.get("/search", async (req, res) => {
        try {
                const validator = jsonschema.validate(req.body, planListSchema)
                if(!validator.valid){
                        const errs = validator.errors.map(e=> e.stack);
                        throw new BadRequestError(errs);
                }
                const q = req.query.q;

                const response = await axios.get(`${PLANTLIST_URL}?key=${apiKey}&q={q}`);
                res.json({plant: response.data});

        }catch(err){
                console.error(err);
        }
        }); 


// use plantlist/create

router.post('/create', async (req, res) => {
        try {
                const { groupName, description } = req.body;
                
                // Call the createPlantGroup function from your PlantListModel
                const result = await PlantListModel.createPlantGroup({ groupName, description });
        
                // Send a success response
                res.status(201).json({ message: 'Plant group created successfully', result });
            } catch (error) {
                console.error('Error creating plant group:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });



router.get("/get-all-plant-groups", async (req, res) => {
        try { console.log("Hello");
                const plantGroups = await PlantListModel.getAllPlantGroup();
                // res.send(result);
                console.log("result:", plantGroups);
                return res.json({plantGroups})

        }catch(err){
                console.error(err)
        }
})



module.exports = router;

