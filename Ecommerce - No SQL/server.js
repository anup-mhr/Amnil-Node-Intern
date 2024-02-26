const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
const app = require('./app')

mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log('success to db'))
    .catch(err => console.error(err))


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on localhost port ${port}`)
})