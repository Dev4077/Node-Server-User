const express = require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const productController = require('../controller/productController')
const router = express.Router()


router.post('/userRegistration', userController.userRegister)

router.get('/userDetails', userController.userDetailsGet)

router.delete('/userDetails/:_id', userController.deleteUser);

router.delete('/categorydelete/:_id', productController.deleteCategory);

router.delete('/subcategorydelete/:_id', productController.deleteSubCategory);

router.put('/userDetails/:_id', userController.updateUser);

router.put('/categoryedit/:_id', productController.editCategory);

router.put('/subcategoryedit/:_id', productController.editSubCategory);

router.post('/authRegistration', authController.authRegister);

router.post('/authlogin', authController.userLogin);

router.post('/addcategory', productController.addCategory);

router.post('/addsubcategory', productController.addSubCategory);

router.post('/addproduct', productController.addProduct);

router.get('/getcategory', productController.getCategory);

router.post('/getcategory', productController.getCategory);

router.post('/activecategory/:_id', productController.activeCat);

router.post('/activesubcategory/:_id', productController.activeSubCat);

router.get('/activecategory', productController.activeCat);

router.get('/getsubcategory', productController.getSubCategory);

router.post('/getsubcategory', productController.getSubCategory);

router.post('/getproduct', productController.getProduct);

router.get('/getproduct', productController.getProduct);


module.exports = router