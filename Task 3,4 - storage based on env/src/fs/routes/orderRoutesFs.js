const express = require('express')
const orderController = require('../controllers/orderController')
const userController = require('./../controllers/userController')

const router = express.Router();

router.param('userId', userController.validateUserId)

router.route('/').get(orderController.getAllOrders)
router.route('/:userId/checkout').post(orderController.checkoutOrder)

module.exports = router;