const express = require("express");
const productController = require("../controllers/productController");
const uploadImage = require("./../../middleware/uploadImage");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authentication.verify,
    authentication.restrictTo("admin", "seller"),
    uploadImage.fields([
      { name: "image", maxCount: 5 },
      { name: "coverImage", maxCount: 1 },
    ]),
    productController.createProduct,
  );

router
  .route("/:productId")
  .patch(
    authentication.verify,
    authentication.restrictTo("admin", "seller"),
    productController.updateProductQantity,
  )
  .put(
    authentication.verify,
    authentication.restrictTo("admin", "seller"),
    productController.updateProduct,
  )
  .delete(productController.deleteProduct);

router.get("/search", productController.filterProducts);
router.get("/out-of-stock", productController.outOfStock);

module.exports = router;
