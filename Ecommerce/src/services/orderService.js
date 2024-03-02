const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.checkoutOrder = async (userId, cartId) => {
  const cart = await Cart.findById(cartId);

  if (!cart) {
    throw new AppError("Your cart is empty", 404);
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
    user_id: userId,
    cart_id: cartId,
    total: totalPrice,
  });
  return newOrder;
};
