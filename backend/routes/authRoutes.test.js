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

    test("/POST - register", async()=> {


        const newUser =  {
            username: "4user", 
            password: "password", 
            firstName: "4user",
            lastName: "4user",
            email: "4user@yahoo.com", 
            imageUrl: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
        }


        const token = jwt.sign(newUser, SECRET_KEY);

        try{

            const resp = await request(app)
            .post("/auth/register")
            .set('Authorization', `Bearer ${token}`)

            expect(resp.statusCode).toBe(201);

        }catch(err){
            console.error(err)
        }
    });

        test("/POST - works", async()=>{

        const savedUser = {
            username: "1user", 
            password:"password"
        }

        const token = jwt.sign(savedUser, SECRET_KEY);

        try{

            const resp = await request(app)
            .post("/auth/token", "1user", "password")
            .set('Authorization', `Bearer ${token}`)

            expect(resp.statusCode).toBe(201);

        }catch(err){
            console.error(err)
        }
        

    });
});



// router.post("/register", async function (req, res, next) {
//     try {
//       const validator = jsonschema.validate(req.body, userSchema);
//       if (!validator.valid) {
//         const errs = validator.errors.map(e => e.stack);
//         throw new BadRequestError(errs);
//       }
  
//       const newUser = await UserModel.register({ ...req.body});
//       const token = createToken(newUser);
//       return res.status(201).json({ token });
  
      
//     } catch (err) {
//       return next(err);
//     }
//   });
  




// router.post("/token", async (req, res, next)=> {
//     try{
//         const validator = jsonschema.validate(req.body, logInSchema);

//         if(!validator.valid) {
//             const errs = validator.errors.map(e=> e.stack);
//             throw new BadRequestError(errs);
//         }

//         const { username, password } = req.body;
//         const user = await UserModel.authenticate(username, password);
//         const token = createToken(user);

//         // console.log("user_id in routes", user_id);
//         return res.json({ token, user: user.user_id});

//       } catch (err) {
//         return next(err);
//       }
//     });


