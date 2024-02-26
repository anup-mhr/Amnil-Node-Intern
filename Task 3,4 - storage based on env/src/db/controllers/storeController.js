const Store = require('./../models/storeModel')
const ObjectId = require("mongoose").Types.ObjectId;

exports.createStore = async (req, res) => {
    try {
        const { name, type, coordinates, userId } = req.body
        const store = await Store.create({
            name,
            type,
            userId,
            location: {
                type: "Point",
                coordinates
            }
            , logo: req.file.filename
        })
        res.json({
            status: 'success',
            data: store
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}
exports.getAllStore = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json({
            status: 'success',
            data: stores
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.findNearStores = async (req, res) => {
    try {
        const { longitude, latitude } = req.body
        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 1000 // 1KM in meters
                    // $minDiastance: 10
                }
            }
        });
        res.json({
            status: 'success',
            data: stores
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.getStoreProducts = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const store = await Store.aggregate([
            { $match: { _id: new ObjectId(storeId) } },   //converting str to obj
            {
                $lookup: {
                    from: 'products',
                    localField: "_id",
                    foreignField: "storeId",
                    as: "productList"
                }
            }
        ])
        res.json({
            status: 'success',
            data: store[0].productList
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}
