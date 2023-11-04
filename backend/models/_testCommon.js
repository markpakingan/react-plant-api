const bcrypt = require("bcrypt");
const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");
const testJobIds = [];


const commonBeforeAll = async () => {

  await db.query("DELETE FROM my_plant_group");
  await db.query("DELETE FROM my_plant_group_plants");
  await db.query("DELETE FROM plant_group_plants_review");
  await db.query("DELETE FROM plants");
  await db.query("DELETE FROM users");


  await db.query(`
  INSERT INTO plants (plant_true_id, common_name, plant_true_id, cycle, default_image)
  VALUES 
  (1, 'Rose', 241, 'Perennial', 'https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg'),
  (2, 'Cactus', 100, 'Perennial', 'https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg'),
  (3, 'Sunflower', 43, 'Perennial', 'https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg')
`);


  await db.query(`
  INSERT INTO users (user_id, username, password, first_name, last_name, email, image_url)
  VALUES 
  (1, '1user', 'password', '1user', '1user', '1user@yahoo.com', 'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg'),
  (2, '2user', 'password', '2user', '2user', '2user@yahoo.com', 'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg')`);


  await db.query(`
  INSERT INTO my_plant_group (my_plant_group_id, group_name, description, user_id)
  VALUES
  (1, 'Dessert Plants', 'list of dessert plants', 1 ),
  (2, 'Summer Plants', 'list of summer plants', 1 ),
  (3, 'Winter Plants', 'list of winter plants', 1 ),
  (4, 'Fall Plants', 'list of fall plants', 1 )
  `);

  await db.query(`
  INSERT INTO my_plant_group_plants (my_plant_group_plants_id, plant_true_id, common_name, group_id, user_id)
  VALUES
  (1, '28', 'Rose', 1, 1),
  (2, '57', 'Cactus', 1, 1),
  (3, '39', 'Sunflower', 2, 1),
  (4, '28', 'Tulips', 2, 1),
  (5, '28', 'Gumamela', 3, 1),
  (6, '28', 'Banana Plant', 3, 1)
  `);


  await db.query(`
  INSERT INTO plant_group_plants_review (plant_group_plants_review_id, my_plant_group_id, user_id, rating, review)
  VALUES
  (1, 1, 1, 5, 'it is awesome!'),
  (2, 2, 1, 3, 'it is just okay'),
  (3, 3, 2, 2, 'too bad'),
  (4, 4, 2, 1, 'this is the worst!')
  `);


}


async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
async function commonAfterAll() {
    await db.end();
  }

  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
  };