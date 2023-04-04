const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");
const VerifyToken = require('../middlewares/verify-token');

router.get("/", VerifyToken.verifyToken, facultyController.findAll);
router.get("/:id", facultyController.findOne)
router.post("/", facultyController.createOne);
router.put("/:id", facultyController.update);
router.delete("/:id", facultyController.delete);
  
module.exports = router;