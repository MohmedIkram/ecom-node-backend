const express = require("express");
const router = express.Router();

// Importing the controller module
const user = require("../controllers/user.controller.js"); 

// User Data
router.post("/signup", user.signup);
router.post("/login", user.login);


module.exports = router;
