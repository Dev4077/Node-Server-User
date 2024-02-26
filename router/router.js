const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()


router.post('/userRegistration',userController.userRegister)

module.exports = router