const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            status: 'success',
            result: orders.length,
            data: orders
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.checkoutOrder = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        const carts = await Cart.findById(cartId)

        const newOrder = await Order.create({
            userId: carts.userId,
            cart: carts.cart,
            total: carts.total
        })
        await Cart.findByIdAndDelete(cartId)
        res.status(200).json({
            status: 'success',
            msg: 'Order has been placed',
            data: newOrder
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        })
    }
}