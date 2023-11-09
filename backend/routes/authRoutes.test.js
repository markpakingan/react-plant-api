"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const request = require('supertest');
const app = require("../app.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";


const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../models/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/***************************************/


describe("AUTH ROUTES", ()=>{

   
    // test("/POST - Login", async()=>{


    //     const savedUser = {
    //         username: "2user", 
    //         password:"password"
    //     }
    //     const token = jwt.sign(savedUser, SECRET_KEY);

    //     const resp = await request(app).post("/auth/token").send(savedUser).set('Authorization',`Bearer ${token}`)

    //     expect(resp.statusCode).toBe(201);

    // });

    test("/POST - register", async () => {
        const newUser = {
          username: "4user",
          password: "password",
          firstName: "4user",
          lastName: "4user",
          email: "4user@yahoo.com",
          imageUrl: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg",
        };
      
        const resp = await request(app).post("/auth/register").send(newUser);
      
        expect(resp.statusCode).toBe(201);
      });
      

});





