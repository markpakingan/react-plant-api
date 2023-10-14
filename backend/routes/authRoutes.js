"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");
const userSchema = require("../schemas/userSchema");
const logInSchema = require("../schemas/logInSchema.json");
const createToken = require("../helpers/tokens");
const UserModel = require("../models/userModel");

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");


router.post("/token", async (req, res, next)=> {
    try{
        const validator = jsonschema.validate(req.body, logInSchema);

        if(!validator.valid) {
            const errs = validator.errors.map(e=> e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await UserModel.authenticate(username, password);
        const token = createToken(user);

        // console.log("user_id in routes", user_id);
        return res.json({ token, user: user.user_id});

      } catch (err) {
        return next(err);
      }
    });



// use to sign up a user. use /auth/register
router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await UserModel.register({ ...req.body});
    const token = createToken(newUser);
    return res.status(201).json({ token });

    
  } catch (err) {
    return next(err);
  }
});


module.exports = router;

