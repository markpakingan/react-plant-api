const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const PlantListModel = require("./plantListModel.js");

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

/************************************** create */

describe("getAllPlants", () => {
    const urlResponse = {
  data: [
    {
      id: 1,
      common_name: "Rose",
      plant_true_id: 241,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    },
    {
      id: 2,
      common_name: "Cactus",
      plant_true_id: 100,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    },
    {
      id: 3,
      common_name: "Sunflower",
      plant_true_id: 43,
      cycle: "Perennial",
      default_image: "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
    }
  ]
};


test("check get response", ()=> {
    let response = PlantListModel.getAllPlants()
})
  });
  
  
