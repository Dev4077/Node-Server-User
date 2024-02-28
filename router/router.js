const express = require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const router = express.Router()


router.post('/userRegistration',userController.userRegister)

router.get('/userDetails', userController.userDetailsGet)

router.delete('/userDetails/:_id', userController.deleteUser);

router.put('/userDetails/:_id', userController.updateUser);

router.post('/authRegistration',authController.authRegister);

router.post('/authlogin', authController.userLogin)

module.exports = router