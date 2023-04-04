const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

router.get("/", facultyController.findAll);
  
module.exports = router;