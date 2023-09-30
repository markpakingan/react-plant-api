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

// router.get("/", async (req, res) => {
//         try {
//                 const validator = jsonschema.validate(req.body, planListSchema)
//                 if(!validator.valid){
//                         const errs = validator.errors.map(e=> e.stack);
//                         throw new BadRequestError(errs);
//                 }

//                 const response = await axios.get(`${PLANTLIST_URL}?key=${apiKey}`);
//                 res.json({plant: response.data});

//         }catch(err){
//                 console.error(err);
//         }
//         }); 


router.get("/", async (req, res) => {
    try{
        const plants = await PlantListModel.getAllPlants();
        res.json({plant: plants})
    }catch(err){
        console.error(err)
    }
})


// request.get("/:handle", async (req, res) => {
//     try{
//         const response = await axios.get(`${PLANTLIST_URL}/species/details/${id}?
//         key=${apiKey}`);

//     }catch(err){
//         console.error("Error fetching plant details", err)
//     }
// })


// this is for the search form
router.get("/", async (req, res) => {
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


module.exports = router;

