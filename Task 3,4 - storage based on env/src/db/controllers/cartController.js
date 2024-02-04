const Cart = require('./../models/cartModel')

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json({
            status: 'success',
            result: carts.length,
            data: carts
        });
    } catch (arr) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.addToCart = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        userCart = await Cart.find({ userId })

        //if users don't have cart 
        if (userCart.length < 1) {
            const cart = await Cart.create({
                userId,
                cart: req.body,
                // total: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                total: req.body.price * req.body.quantity
            })
            return res.status(201).json({
                status: 'success',
                msg: 'Added to cart',
                data: cart
            })
        }
        let newCart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { cart: req.body } },
            { new: true } // Return the updated document
        )
        newCart = await Cart.findOneAndUpdate(
            { userId },
            { total: newCart.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) },
            { new: true } // Return the updated document
        )
        return res.status(200).json({
            status: 'success',
            msg: 'Added to cart',
            data: newCart
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.getUserCart = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const userCart = await Cart.find({ userId })
        res.status(200).json({
            status: 'success',
            result: userCart.length,
            cart: userCart
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}
