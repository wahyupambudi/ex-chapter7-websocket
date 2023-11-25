const express = require("express");
const router = express.Router();
const userRoute = require('../routes/user.route')
const socketioRoute = require('../routes/socketio.route')

router.use('/user', userRoute)
router.use('/socketio', socketioRoute)

module.exports = router;
