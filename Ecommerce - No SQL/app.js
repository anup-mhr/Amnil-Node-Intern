const express = require('express')

const AppError = require('./src/utils/appError')
const globalErrorHandler = require('./middleware/globalErrorHandler')

const userRouter = require('./src/routes/userRoutes')
const productRouter = require('./src/routes/productRouter')
const cartRouter = require('./src/routes/cartRoutes')
const orderRouter = require('./src/routes/orderRoutes')
const auctionRouter = require('./src/routes/auctionRoutes')
const storeRouter = require('./src/routes/storeRoutes')
const staticRouter = require('./src/routes/staticRoutes')

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());                    //for parsing json
app.use(express.urlencoded({ extended: false }));       //for reading form data
app.use(express.static('dev-data'))                 //for ui views


//ROUTES
app.use('/pages', staticRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/orders', orderRouter)
app.use('/auctions', auctionRouter)
app.use('/store', storeRouter)

//Invalid url handling middleware
app.all('*', (req, res, next) => {
    // const err = new Error(`Can't fint ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404
    // next(err);      //ignore other middleware stack and go straight to globa err handler

    next(new AppError(`Can't fint ${req.originalUrl} on this server`, 404))
})

//Global error handling middleware
app.use(globalErrorHandler)


module.exports = app;