const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.json({
      status: "success",
      result: carts.length,
      data: carts,
    });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.product_id);
    if (!product) {
      return next(new AppError("Product is not available", 404));
    }

    let userCart = await Cart.findOne({ user_id: req.user._id });
    let cart;
    if (!userCart || userCart.length === 0) {
      cart = await Cart.create({
        user_id: req.user.id,
        cart: [req.body],
      });
    } else {
      userCart.cart.push(req.body);
      cart = await userCart.save();
    }

    res.status(201).json({
      status: "success",
      msg: "Added to cart",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    const userCart = await Cart.find({ user_id: req.user._id });
    res.status(200).json({
      status: "success",
      result: userCart.length,
      cart: userCart,
    });
  } catch (err) {
    next(err);
  }
};
