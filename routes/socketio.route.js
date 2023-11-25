const express = require("express");
const router = express.Router();
const {
  Chat,
} = require("../controller/socketio.controller");

router.get("/chat", Chat);

module.exports = router;