"use strict";

const db = require("../db");
const bcrypt = require("bcrypt"); 
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");


class UserModel {
    static async authenticate(username, password) {
      const result = await db.query(
        `SELECT user_id,
                username,
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
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          delete user.password;
          return user;
        }
      }
  
      throw new UnauthorizedError("Invalid username/password");
    }
  

    static async register({username, password, firstName, lastName, email, imageUrl}) {

        const duplicateCheck = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1`,
            [username],
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

    /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  image_url AS imageUrl
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  static async fetchUser(username){

    const result = await db.query(
      `SELECT username,
                  first_name AS "firstname",
                  last_name AS "lastname",
                  email,
                  image_url AS "imageurl"
        FROM users
        WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;


  }

  static async updateUser(username, firstname, lastname, email, imageurl){
    const result = await db.query(
      `UPDATE users
      SET first_name = $1, last_name = $2, email = $3, image_url = $4
      WHERE username = $5
      RETURNING username, first_name AS "firstname", 
      last_name AS "lastname",email, image_url AS imageurl`,
      [firstname, lastname, email, imageurl, username],
    );

    const user = result.rows[0];
    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }
}

module.exports = UserModel;