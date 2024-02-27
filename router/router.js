const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()


router.post('/userRegistration',userController.userRegister)

router.get('/userDetails', userController.userDetailsGet)

router.delete('/userDetails/:_id', userController.deleteUser);

router.put('/userDetails/:_id', userController.updateUser);

module.exports = router