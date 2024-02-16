const express = require("express");
const router = express.Router();
//Get all the handler functions
const {localFileUpload} = require("../controllers/fileUpload");
const {imageUpload} = require("../controllers/fileUpload");
const {videoUpload} = require("../controllers/fileUpload");
const {imageSizeReducer} = require("../controllers/fileUpload");

//api route
router.post("/localfileupload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducerandUpload",imageSizeReducer);



module.exports = router;