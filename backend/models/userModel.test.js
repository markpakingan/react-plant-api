"use strict";
const db = require("../db.js");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const UserModel = require("./userModel");
const request = require('supertest');
const app = require("../app.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
  } = require("./_testCommon.js");

  beforeAll(commonBeforeAll);
  beforeEach(commonBeforeEach);
  afterEach(commonAfterEach);
  afterAll(commonAfterAll);

  /***************************************/


  describe("/USER - Authorization", ()=> {

    test("/GET - authenticate", async()=> {
        try{
            
            const testUser = {
                username: "1user",
                password: "password"
            }

            let user = await UserModel.authenticate(testUser.username, testUser.password);

            const result = await db.query("SELECT username & password FROM users WHERE username = '1user'");
            expect(user).toEqual(result.rows[0]);
            
        }catch(err){
            console.error("failed to authenticate user and pw on TEST:", err)
        }
    });

    test("/GET - unauthorized", async()=>{

        try{
            
            let user = await UserModel.authenticate("1user", "wrong password");
            fail();

        }catch(err){
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });

    test("/POST - register", async()=> {

        const newUserData = {
            username: "3user", 
            password: "password", 
            firstName: "3user", 
            lastName: "3user", 
            email: "3user@yahoo.com", 
            imageUrl: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
        }


        const expectedUserData ={
            username: "3user", 
            first_name: "3user", 
            last_name: "3user", 
            email: "3user@yahoo.com", 
            image_url: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
        }
        await UserModel.register(newUserData); 


        const result = await db.query("SELECT username, first_name, last_name, email, image_url FROM users WHERE username = '3user'");

        expect(expectedUserData).toEqual(result.rows[0]);
    })

    test("/PUT - updateUser", async ()=> {

        const updatedUserData ={
            username: "1user", 
            firstname: "changedFirstName", 
            lastname: "1user", 
            email: "newEmailAddress@yahoo.com", 
            imageurl: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
        }


        let updatedUser = await UserModel.updateUser("1user","changedFirstName","1user", "newEmailAddress@yahoo.com", "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg");

        let result = await db.query("SELECT username, first_name AS firstname, last_name AS lastname, email, image_url AS imageurl FROM users WHERE username = '1user'");

        expect(updatedUser).toEqual(result.rows[0]);
    })


  });

