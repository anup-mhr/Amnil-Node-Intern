const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.getAllproducts = async () => {
  return await Product.find();
};

exports.createProduct = async (files, productData) => {
  if (files.image) {
    productData.images = files.image.map((file) => file.filename);
  }
  if (files.coverImage) {
    productData.coverImage = files.coverImage[0].filename;
  }

  return await Product.create(productData);
};

exports.updateProduct = async (id, data) => {
  const newProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!newProduct) {
    throw new AppError("Product not found", 404);
  }
  return newProduct;
};

exports.updateProductQantity = async (id, data) => {
  if (!data.quantity) {
    throw new AppError("Invalid quantity provided", 400);
  }
  const newProduct = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!newProduct) {
    throw new AppError("Product not found", 404);
  }
  return newProduct;
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

exports.searchProduct = async (queryString) => {
  //1) filtering
  console.log(queryString);
  const queryObj = { ...queryString };
  const excludedFields = ["page", "sortBy", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  //2) Advance filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Product.find({
    name: {
      $regex: new RegExp(queryObj.q, "i"),
    },
  });

  // sorting
  if (queryString.sortBy) {
    query = query.sort(queryString.sortBy);
  }

  if (queryString.fields) {
    const fields = queryString.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  if (queryString.productType) {
    query = query.find({
      product_type: queryString.productType,
    });
  }

  //execute query
  const products = await query;
  return products;
};

exports.quantityLessThan5 = async () => {
  return await Product.find({
    quantity: {
      $lt: 5,
    },
  });
};
