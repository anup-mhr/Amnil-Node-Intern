const express = require("express");
const cartController = require("../controllers/cartController");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

router.get(
  "/",
  authentication.verify,
  authentication.restrictTo("admin"),
  cartController.getAllCarts,
);
router.get("/view", authentication.verify, cartController.getUserCart);
router.post("/add-to-cart", authentication.verify, cartController.addToCart);

module.exports = router;
