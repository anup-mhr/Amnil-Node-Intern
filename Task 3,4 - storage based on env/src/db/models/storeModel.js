const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    name: String,
    logo: String,
    type: String,
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store;