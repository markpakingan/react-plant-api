"use strict";



const jsonschema = require("jsonschema");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn} = require("../middleware/auth");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");
const router = express.Router();



router.post("/", ensureLoggedIn, async (res, req, next)=> {
    try{
      const user = await UserModel.get(req.params.username);
      return res.json({user});
    }catch(err){
        return next(err)
    }
})
module.exports = router;