const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.findAll);
router.get("/:id", studentController.findOne);
router.post("/login", studentController.login);
  
module.exports = router;