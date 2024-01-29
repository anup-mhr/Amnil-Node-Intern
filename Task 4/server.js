const express = require('express')
const fs = require('fs')

const app = express();
const port = 3000

app.use(express.json());

const usersFilePath = 'users.json';
const ordersFilePath = 'orders.json';

const readUsersFile = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writeUsersFile = (data) => fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');

const readOrdersFile = () => JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8'));
const writeOrdersFile = (data) => fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2), 'utf-8');


// User APIs
app.get('/users', (req, res) => {
    res.send(readUsersFile())
})

app.post('/users', (req, res) => {
    const users = readUsersFile()
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    writeUsersFile(users);
    res.status(201).json(newUser);
})

app.put('/users/:id', (req, res) => {
    const users = readUsersFile();
    const updatedUser = req.body;
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users[index] = { ...users[index], ...updatedUser };
    writeUsersFile(users);
    res.status(200).json(users[index]);

})

app.delete('/users/:id', (req, res) => {
    const users = readUsersFile();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(index, 1);
    writeUsersFile(users);
    res.json(deletedUser);
})

// Order APIs
app.get('/orders', (req, res) => {
    res.json(readOrdersFile());
})

app.post('/users/:userId/add-to-cart', (req, res) => {
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
})

app.post('/users/:userId/checkout', (req, res) => {
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
})


app.listen(port, () => {
    console.log(`listening on localhost port ${port}`)
})
