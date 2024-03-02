const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User is required"],
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
    required: [true, "Please select the cart"],
  },
  total: {
    type: Number,
  },
  order_status: {
    type: String,
    default: "payed",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
