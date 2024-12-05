const express = require('express');
const router = express.Router();
const userRoute = require('../controller/userController')

router.get('/user',userRoute.getUserDetails)

module.exports = router