const express = require("express");
const orderController = require("../controllers/orderController");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.get(
  "/",
  authentication.verify,
  authentication.restrictTo("admin"),
  orderController.getAllOrders,
);
router.post("/checkout", authentication.verify, orderController.checkoutOrder);

module.exports = router;
