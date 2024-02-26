const orderService = require("../services/orderService");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
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
    const newOrder = await orderService.checkoutOrder(req.user._id, req.body.cartId);
    res.status(200).json({
      status: "success",
      msg: "Order has been placed",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};
