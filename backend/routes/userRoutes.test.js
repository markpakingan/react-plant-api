"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError.js");
const request = require('supertest');
const app = require("../app.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../models/_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/***************************************/

describe("USER ROUTES", ()=> {

  test("/GET - /:username", async()=> {


    const resp = await request(app)
    .get("/user/1user");

    expect(resp.statusCode).toBe(200);
  });

  test("/PUT - /:username", async()=> {


    const updatedUserData = {
      firstname: "1user", 
      lastname: "newLastname",
      email: "1user@yahoo.com", 
      imageurl: "https://images.pexels.com/photos/5395773/pexels-photo-5395773.jpeg"
    }


    const resp = await request(app)
    .put("/user/1user")
    .send(updatedUserData);


    expect (resp.statusCode).toBe(200);
    })


})

