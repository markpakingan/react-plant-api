// plantListRoutes.js file

const express = require("express");
const router =  new express.Router();
const axios = require("axios");


const PLANTLIST_URL = "https://perenual.com/api/species-list"

router.get("/", async (req, res) => {
        try {
                const response = await axios.get(`${PLANTLIST_URL}?key=sk-jOiN650e26e69299c2256`);
                
                res.json({data: response.data});

        }catch(err){
                console.error(err);
        }
        }); 



module.exports = router;

