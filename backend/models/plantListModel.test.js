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
      data: {
        "id": 241,
        "common_name": "Venus Flowering Dogwood",
        "scientific_name": "Cornus 'Venus' " ,
        "other_name": "Hybrid Dogwood", 
        "cycle": "Perennial",
        "watering": "Average",
        "default_image": "https://perenual.com/storage/species_image/241_cornus_venus/og/51206617814_99263a098f_b.jpg"
      }
    };
  
    test("getAllPlants function should return plant data", async () => {

        let result = await PlantListModel.getAllPlantGroup();
        
        // Check if the function returns the expected data
      expect(result).toEqual(urlResponse.data);
  
    });
  });
  
