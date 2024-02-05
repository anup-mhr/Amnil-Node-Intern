const express = require('express')
const productController = require('./../controllers/productController')
const uploadImage = require('../../../middleware/uploadImage')

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProducts)
    .post(uploadImage.fields([{ name: 'image', maxCount: 5 }, { name: 'coverImage', maxCount: 1 }]), productController.createProduct)

router
    .route('/:id')
    .patch(productController.updateProductQantity)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

router.route('/search').get(productController.filterProducts)
router.route('/out-of-stock').get(productController.outOfStock)

module.exports = router