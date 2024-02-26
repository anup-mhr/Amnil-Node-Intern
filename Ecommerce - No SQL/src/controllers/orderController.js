const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json({
      status: "success",
      result: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.checkoutOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.body.cartId);

    if (!cart) {
      return next(new AppError("Your cart is empty", 404));
    }
    const orderDetails = await Cart.aggregate([
      { $match: { _id: cart._id } },
      {
        $lookup: {
          from: "products",
          localField: "cart.product_id",
          foreignField: "_id",
          as: "productList",
        },
      },
      {
        $project: {
          "cart.quantity": 1,
          "productList.price": 1,
        },
      },
    ]);

    //calculating total price
    let totalPrice = 0;
    for (let i = 0; i < orderDetails[0].cart.length; i++) {
      totalPrice =
        totalPrice + orderDetails[0].cart[i].quantity * orderDetails[0].productList[i].price;
    }

    const newOrder = await Order.create({
      user_id: req.user._id,
      cart_id: req.body.cartId,
      total: totalPrice,
    });

    res.status(200).json({
      status: "success",
      msg: "Order has been placed",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};
