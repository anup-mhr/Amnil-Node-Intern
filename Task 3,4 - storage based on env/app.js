const express = require('express')
const userRouterDb = require('./src/db/routes/userRoutesDb')
const productRouterDb = require('./src/db/routes/productRouterDb')
const cartRouterDb = require('./src/db/routes/cartRoutesDb')
const orderRouterDb = require('./src/db/routes/orderRoutesDb')
const userRouterFs = require('./src/fs/routes/userRoutesFs')
const orderRouterFs = require('./src/fs/routes/orderRoutesFs')
const productRouterFs = require('./src/fs/routes/productRouterFs')
const cartRouterFs = require('./src/fs/routes/cartRoutesFs')

const app = express();
app.use(express.json());

const store = process.env.STORE_TO
console.log(store)

//ROUTES
if (store === 'DB') {
    app.use('/users', userRouterDb)
    app.use('/products', productRouterDb)
    app.use('/carts',cartRouterDb)
    app.use('/orders', orderRouterDb)
} else if (store === 'FS') {
    app.use('/users', userRouterFs)
    app.use('/orders', orderRouterFs)
    app.use('/products', productRouterFs)
    app.use('/carts/',cartRouterFs)
} else {
    console.log('Invalid Storage Option')
}

module.exports = app;