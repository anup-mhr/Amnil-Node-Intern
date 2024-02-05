const { readCartFile, writeCartFile } = require('../utils/cartFs');

exports.getAllCarts = (req, res) => {
    const carts = readCartFile();
    res.json({
        status: 'success',
        result: carts.length,
        data: carts
    });
}

exports.addToCart = (req, res) => {
    const userId = parseInt(req.params.userId);
    const cartItem = req.body

    const carts = readCartFile();
    const userCartIndex = carts.findIndex(c => c.userId === userId);

    // if there is no cart for user, make one
    if (userCartIndex === -1) {
        const cart = [cartItem]
        const newCart = {
            userId,
            cart,
            total: cartItem.price * cartItem.quantity
        };
        carts.push(newCart)
        writeCartFile(carts)
        return res.status(200).json({
            status: 'success',
            msg: 'Added to cart',
            data: cart
        });
    }

    carts[userCartIndex].cart.push(cartItem)
    carts[userCartIndex].total += cartItem.price * cartItem.quantity;

    writeCartFile(carts)
    return res.status(200).json({
        status: 'success',
        msg: 'Added to cart',
        data: carts[userCartIndex]
    });
}

exports.getUserCart = (req, res) => {
    const userId = parseInt(req.params.userId);

    const carts = readCartFile();
    const userCartIndex = carts.findIndex(c => c.userId === userId);

    if (userCartIndex == -1) {
        return res.status(200).json({
            status: 'success',
            msg: 'Cart is empty',
            cart: []
        });
    }
    const userCart = carts[userCartIndex].cart
    res.status(200).json({
        status: 'success',
        result: userCart.length,
        cart: userCart
    });

}
