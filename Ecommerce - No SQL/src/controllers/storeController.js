const Store = require("../models/storeModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createStore = async (req, res, next) => {
  try {
    const { name, type, coordinates } = req.body;
    const store = await Store.create({
      name,
      type,
      user_id: req.user._id,
      location: {
        type: "Point",
        coordinates,
      },
      logo: req.file.filename,
    });
    res.json({
      status: "success",
      data: store,
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllStore = async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.json({
      status: "success",
      data: stores,
    });
  } catch (err) {
    next(err);
  }
};

exports.findNearStores = async (req, res, next) => {
  try {
    const { longitude, latitude } = req.body;
    const stores = await Store.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 1000, // 1KM in meters
          // $minDiastance: 10
        },
      },
    });
    res.json({
      status: "success",
      data: stores,
    });
  } catch (err) {
    next(err);
  }
};

exports.getStoreProducts = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.aggregate([
      { $match: { _id: new ObjectId(storeId) } }, //converting str to obj
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "store_id",
          as: "productList",
        },
      },
    ]);
    res.json({
      status: "success",
      data: store[0].productList,
    });
  } catch (err) {
    next(err);
  }
};
