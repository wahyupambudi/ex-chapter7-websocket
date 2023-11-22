const express = require("express");
const router = express.Router();
const {Insert} = require("../controller/user.controller");


router.post("/", Insert);


module.exports = router;
