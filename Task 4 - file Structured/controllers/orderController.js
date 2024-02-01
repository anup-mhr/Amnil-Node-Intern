const fs = require('fs')

const readUsersFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8'));
const readOrdersFile = () => JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/orders.json`, 'utf-8'));
const writeOrdersFile = (data) => fs.writeFileSync(`${__dirname}/../dev-data/data/orders.json`, JSON.stringify(data, null, 2), 'utf-8');


exports.getAllOrders = (req, res) => {
    res.json(readOrdersFile());
}

exports.addToCart = (req, res) => {
    const userId = parseInt(req.params.userId);
    const users = readUsersFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

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
    res.status(200).json(order);
}

exports.checkoutOrder = (req, res) => {
    const userId = parseInt(req.params.userId);
    const users = readUsersFile();
    const user = users.find((u) => u.id === userId);

    if (!user) return res.status(404).json({ error: "User not found" });

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
    res.status(200).json({ success: 'Order placed successfully' });
}
