const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getAllCarts = async () => {
  return await Cart.find();
};

exports.addToCart = async (userId, productData) => {
  const product = await Product.findById(productData.product_id);
  if (!product) {
    throw new AppError("Product is not available", 404);
  }

  let userCart = await Cart.findOne({ user_id: userId });
  let cart;
  if (!userCart || userCart.length === 0) {
    cart = await Cart.create({
      user_id: userId,
      cart: [productData],
    });
  } else {
    userCart.cart.push(productData);
    cart = await userCart.save();
  }
  return cart;
};

exports.getCartByUserId = async (userId) => {
  return await Cart.find({ user_id: userId });
};
