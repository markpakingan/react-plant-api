"use strict";

// const db = require("../db");
const bcrypt = require("bcrypt");

class UserModel {


       // CREATE TABLE Users (
        //     user_id
        //     username 
        //     "password"
        //     email
        //     image_url 
        //     
        // );


    static async authenticate (username, password) {
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    image_url AS "imageUrl"
             FROM users
             WHERE username = $1`,
          [username]
      );

      const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");

    }


    static async register({username, password, firstName, lastName, email, image_url}) {

        const duplicateCheck = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1,
            [username],`
        )
    
            if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // CREATE TABLE Users (
        //     user_id
        //     username 
        //     "password"
        //     email
        //     image_url 
        //     
        // );

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            image_url)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, 
           image_url AS "imageUrl"`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          email,
          imageUrl,
        ],
    );

    const user = result.rows[0];

    return user;
    }
    
}

module.exports = UserModel;