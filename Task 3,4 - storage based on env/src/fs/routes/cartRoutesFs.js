const express = require('express')
const cartController = require('../controllers/cartController')
const userController = require('./../controllers/userController')

const router = express.Router();

router.param('userId', userController.validateUserId)

router.route('/').get(cartController.getAllCarts)
router.route('/:userId').get(cartController.getUserCart)
router.route('/:userId/add-to-cart').post(cartController.addToCart)

module.exports = router;