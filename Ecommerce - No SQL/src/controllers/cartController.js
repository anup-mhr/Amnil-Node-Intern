const cartService = require("../services/cartService");

exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await cartService.getAllCarts();
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
    const cart = await cartService.addToCart(req.user._id, req.body);

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
    const userCart = await cartService.getCartByUserId(req.user._id);
    res.status(200).json({
      status: "success",
      result: userCart.length,
      cart: userCart,
    });
  } catch (err) {
    next(err);
  }
};
