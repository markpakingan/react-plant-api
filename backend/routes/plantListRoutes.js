// plantListRoutes.js file

const express = require("express");
const router = new express.Router();
const axios = require("axios");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const PlantListModel = require("../models/plantListModel");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth")

const planListSchema = require("../schemas/plantListSchema.json");
const apiKey = process.env.API_KEY;

const PLANTLIST_URL = "https://perenual.com/api/species-list";

const cors = require("cors");
router.use(cors());


// ********************************************************************
// FOR PLANTLIST

// gets a random list of all plants
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const plants = await PlantListModel.getAllPlants();
    res.json({ plant: plants });
  } catch (err) {
    console.error(err);
  }
});

// gets the specific details of a plant
router.get("/:plant_true_id", ensureLoggedIn, async (req, res) => {
  try {
    const {plant_true_id} = req.params;
    const plantDetails = await PlantListModel.getPlantDetails(plant_true_id);
    res.json({ plant: plantDetails });
  } catch (err) {
    console.error(err);
  }
});

// adds a specific plant to a Plant Group
router.post("/add-plant-to-group", ensureCorrectUser, async (req, res)=> {
  try{
    // console.log("req.body in add-to-plant-group-routers:", req.body);
    const {plant_true_id, common_name, group_id, user_id, username} = req.body;

    const parsedGroupId = parseInt(group_id,10);

    const result = await PlantListModel.addPlantDetails(
      plant_true_id, 
      common_name, 
      parsedGroupId, 
      user_id
    );
    res.status(201).json({message: "plant details successfully added", result})

  }catch(err){
    console.error(err)
  }
});


// this is for the search form
router.get("/search", ensureLoggedIn, async (req, res) => {
  try {
    const {query} = req.query;
    console.log("query in Routes", query);

    const result = await PlantListModel.getPlantQueryList(query);
    return res.json({ result });
    
  } catch (err) {
    console.error("failed to fetch plant data in routes", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// deletes a specific Plant from a PlantGroup based on a user
router.delete("/delete-plant-pick/:my_plant_group_plants_id", ensureCorrectUser, async (req, res) =>{
  try{
    
    const {username} = req.query.username;
    const {my_plant_group_plants_id} = req.params;
    console.log("my plants group id value is:", my_plant_group_plants_id);
    await PlantListModel.deleteGardenPlant(my_plant_group_plants_id);
    return res.json({deleted: group_id})

  }catch(err){
    console.error("can't delete planted pick in routes", err);
  }
})

// ********************************************************************
// FOR PLANTGROUP

// creates a new plantgroup
router.post("/group/create", ensureCorrectUser, async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); 
    const { groupName, description, user_id, username } = req.body;

    
    // Call the createPlantGroup function from your PlantListModel
    const result = await PlantListModel.createPlantGroup({
      groupName,
      description,
      user_id, 
      username
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

// fetches all plants per group based on a user
router.get("/fetch-all-plant-per-group/:user_id", ensureCorrectUser, async (req, res) => {
  try{
    const {user_id} = req.params;
    const {username} = req.query;
    
    const plantListBullets = await PlantListModel.fetchPlantListtoGroups(user_id);
    return res.json({plantListBullets})
  }catch(err){
    console.error("failed to fetch plants per groups in routes", err)
  }
});


// on my-plants-groups, get all plant groups created by the user
router.get("/get-all-plant-groups/user/:user_id", ensureCorrectUser, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const {username} = req.query;

    const plantGroups = await PlantListModel.getAllPlantGroup(user_id);
    console.log("Check user_id value in router:", user_id);
    return res.json({ plantGroups });
  } catch (err) {
    console.error(err);
  }
});


router.delete("/:group_name", ensureCorrectUser, async (req, res) => {
  try{
    const {username} = req.query;
    const {group_name} = req.params;
    console.log("group_name in routes:", group_name);
    await PlantListModel.deletePlantGroup(group_name);
    return res.json({deleted: group_name})
  }catch(err){
    console.error(err)
  }
});


router.get("/group/:my_plant_group_id", ensureCorrectUser, async (req, res) => {
  try{
    const {my_plant_group_id} = req.params;
    const {username} = req.query;
    console.log("my_plant_group_id value in routes", my_plant_group_id);
    const groupDetails = await PlantListModel.getPlantGroupDetails(my_plant_group_id);
    res.json({group: groupDetails});
    
    return res.json({updated: req.params.my_plant_group_id})
  }catch(err){
    console.error(err)
  }
});

router.put("/group/update/:id", ensureCorrectUser, async (req, res)=> {

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
router.post("/create-review", ensureCorrectUser, async (req,res)=> {
  try{
    const {my_plant_group_id, user_id, rating, review, username} = req.body;
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

router.get("/get-review/user/:user_id", ensureCorrectUser, async(req,res)=> {
  try{

    const {user_id} = req.params;

    const response = await PlantListModel.getAllPlantReview(user_id);
    return res.json({ response });

  }catch(err){
    console.log("failed to get reviews from routers", err);
  }
});

router.delete("/group/:my_plant_group_id", ensureCorrectUser, async (req, res) => {
  try{
    const {username} = req.query;
    const {my_plant_group_id} = req.params;

    await PlantListModel.deletePlantReview(my_plant_group_id);
    return res.json({deleted: my_plant_group_id})
  }catch(err){
    console.error("Failed to delete error in routes",err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;