const dotenv = require('dotenv')
const express = require('express')
const userRouter = require('./routes/userRoutes')
const orderRouter = require('./routes/orderRoutes')

dotenv.config({ path: './config.env' })

const app = express();
app.use(express.json());

// ROUTES
app.use('/users', userRouter)
app.use('/orders', orderRouter)

module.exports = app;
