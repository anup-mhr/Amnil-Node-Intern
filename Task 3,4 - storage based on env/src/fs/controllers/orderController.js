const { readOrdersFile, writeOrdersFile } = require('./../utils/ordersFs');
const { readCartFile, writeCartFile } = require('./../utils/cartFs');

exports.getAllOrders = (req, res) => {
    const orders = readOrdersFile();
    res.json({
        status: 'success',
        result: orders.length,
        data: orders
    });
}

/*
exports.addToCart = (req, res) => {
    const userId = parseInt(req.params.userId);

    const cart = req.body.cart || [];

    if (cart.length === 0) return res.json({ error: "Cart is empty" });

    const order = {
        userId,
        cart,
        total: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
        status: 'Not payed',
        orderDate: Date.now
    };

    writeOrdersFile([...readOrdersFile(), order]);
    res.status(200).json({
        status: 'success',
        msg: 'Added to cart',
        data: order
    });
}

exports.checkoutOrder = (req, res) => {
    const userId = parseInt(req.params.userId);

    const orders = readOrdersFile();
    const userOrders = orders.filter(o => o.userId === userId && o.status === "Not payed");

    if (userOrders.length < 1) return res.status(400).jsonjson({ error: 'No items in the cart to checkout' });

    const totalPrice = userOrders.reduce((acc, order) => acc + order.total, 0);

    // Set a minimum threshold for the total price of an order
    const minimumThreshold = 50;

    if (totalPrice < minimumThreshold) {
        return res.status(400).json({ error: `Order total must be at least $${minimumThreshold}` });
    }

    userOrders.forEach(order => {
        order.status = 'payed'
    });

    writeOrdersFile(orders)
    res.status(200).json({
        status: 'success',
        msg: 'Order placed successfully'
    });
}
*/

exports.checkoutOrder = (req, res) => {
    const userId = parseInt(req.params.userId);

    const carts = readCartFile();
    const orders = readOrdersFile();
    const userCartIndex = carts.findIndex(c => c.userId === userId);

    //checking if there is cart or cart is empty 
    if (userCartIndex === -1 || carts[userCartIndex].cart.length < 1) return res.json({
        status: 'fail',
        msg: 'Cart is Empty'
    })

    const newOrder = carts[userCartIndex]
    newOrder.status = "payed"
    orders.push(newOrder)
    writeOrdersFile(orders)

    //resetting the cart
    carts.splice(userCartIndex,1)
    // carts[userCartIndex].cart = []
    writeCartFile(carts)
    
    return res.status(200).json({
        status: 'success',
        msg: 'Order has been placed',
    })
}