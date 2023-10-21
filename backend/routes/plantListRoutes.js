// plantListRoutes.js file

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const PlantListModel = require("../models/plantListModel");

const planListSchema = require("../schemas/plantListSchema.json");
const apiKey = process.env.API_KEY;

const PLANTLIST_URL = "https://perenual.com/api/species-list";

const cors = require("cors");
router.use(cors());


// ********************************************************************
// FOR PLANTLIST
router.get("/", async (req, res) => {
  try {
    const plants = await PlantListModel.getAllPlants();
    res.json({ plant: plants });
  } catch (err) {
    console.error(err);
  }
});


router.get("/:plant_true_id", async (req, res) => {
  try {
    const {plant_true_id} = req.params;
    const plantDetails = await PlantListModel.getPlantDetails(plant_true_id);
    res.json({ plant: plantDetails });
  } catch (err) {
    console.error(err);
  }
});

// adds a specific plant to a Plant Group
router.post("/add-plant-to-group", async (req, res)=> {
  try{
    console.log("req.body in add-to-plant-group-routers:", req.body);
    const {plant_true_id, common_name, group_id} = req.body;
    const parsedGroupId = parseInt(group_id,10);

    const result = await PlantListModel.addPlantDetails(
      plant_true_id, 
      common_name, 
      parsedGroupId
    );

    res.status(201).json({message: "plant details successfully added", result})



  }catch(err){
    console.error(err)
  }
});


// this is for the search form
router.get("/search", async (req, res) => {
  try {
    const validator = jsonschema.validate(req.body, planListSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const q = req.query.q;

    const response = await axios.get(`${PLANTLIST_URL}?key=${apiKey}&q={q}`);
    res.json({ plant: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ********************************************************************
// FOR PLANTGROUP

router.post("/group/create", async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); 
    const { groupName, description, user_id } = req.body;

    
    // Call the createPlantGroup function from your PlantListModel
    const result = await PlantListModel.createPlantGroup({
      groupName,
      description,
      user_id
    });

    // Send a success response
    res
      .status(201)
      .json({ message: "Plant group created successfully", result });
  } catch (error) {
    console.error("Error creating plant group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/get-all-plant-groups/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const plantGroups = await PlantListModel.getAllPlantGroup(user_id);
    console.log("Check user_id value in router:", user_id);
    return res.json({ plantGroups });
  } catch (err) {
    console.error(err);
  }
});


router.delete("/:group_name", async (req, res) => {
  try{
    const {group_name} = req.params;
    console.log("group_name in routes:", group_name);
    await PlantListModel.deletePlantGroup(group_name);
    return res.json({deleted: group_name})
  }catch(err){
    console.error(err)
  }
})


router.get("/group/:my_plant_group_id", async (req, res) => {
  try{
    const {my_plant_group_id} = req.params;
    console.log("my_plant_group_id value in routes", my_plant_group_id);
    const groupDetails = await PlantListModel.getPlantGroupDetails(my_plant_group_id);
    res.json({group: groupDetails});
    
    return res.json({updated: req.params.my_plant_group_id})
  }catch(err){
    console.error(err)
  }
});

router.put("/group/update/:id", async (req, res)=> {

  try{

    const groupId = req.params.id;
    const { groupName, description } = req.body;

    const result = await PlantListModel.updatePlantGroupDetails(
      groupName,
      description,
      groupId
    );

    res.json({ plantGroup: result})

  }catch(err){
    console.error("Failed to update plantgroup!", err)
  }
});

// ********************************************************************
// FOR REVIEWS
router.post("/create-review", async (req,res)=> {
  try{
    const {my_plant_group_id, user_id, rating, review} = req.body;
    console.log("create review value(my_plant_group_id, user_id, rating, review),[my_plant_group_id, user_id, rating, review]");
    const result = await PlantListModel.createPlantReview({
      my_plant_group_id, 
      user_id, 
      rating, 
      review
    });

    res.json({ message: "Plant review created successfully", result });



  }catch(err){
    console.error("failed to post review on routers", err)
  }
});

router.get("/get-review/user/:user_id", async(req,res)=> {
  try{

    const {user_id} = req.params;

    const response = await PlantListModel.getAllPlantReview(user_id);
    return res.json({ response });

  }catch(err){
    console.log("failed to get reviews from routers", err);
  }
});

router.delete("/group/:my_plant_group_id", async (req, res) => {
  try{
    const {my_plant_group_id} = req.params;
    await PlantListModel.deletePlantReview(my_plant_group_id);
    return res.json({deleted: my_plant_group_id})
  }catch(err){
    console.error("Failed to delete error in routes",err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;