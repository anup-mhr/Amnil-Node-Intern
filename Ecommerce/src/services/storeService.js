const Store = require("../models/storeModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllStore = async () => {
  return await Store.find();
};

exports.createStore = async (userId, file, data) => {
  const { name, type, coordinates } = data;
  const store = await Store.create({
    name,
    type,
    user_id: userId,
    location: {
      type: "Point",
      coordinates,
    },
    logo: file.filename,
  });
  return store;
};

exports.getProductsOfStore = async (storeId) => {
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
  return store[0].productList;
};

exports.StoresNearInMeter = async (meter, location) => {
  const { longitude, latitude } = location;
  const stores = await Store.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: meter,
        // $minDiastance: 10
      },
    },
  });
  return stores;
};
