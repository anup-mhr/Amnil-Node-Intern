const express = require('express')
const productController = require('./../controllers/productController')

const router = express.Router();

router.param('id', productController.validateProduct);

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.validateProductFields, productController.createProduct)

router
    .route('/:id')
    .patch(productController.updateProductQantity)
    .post(productController.updateProduct)
    .delete(productController.deleteProduct)

router.route('/search').get(productController.filterProducts)
router.route('/out-of-stock').get(productController.outOfStock)

module.exports = router