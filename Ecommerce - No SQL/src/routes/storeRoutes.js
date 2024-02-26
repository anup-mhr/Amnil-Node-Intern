const express = require("express");
const storeController = require("../controllers/storeController");
const uploadImage = require("./../../middleware/uploadImage");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .get(authentication.verify, authentication.restrictTo("admin"), storeController.getAllStore)
  .post(authentication.verify, uploadImage.single("storeLogo"), storeController.createStore);

router.get("/search", authentication.verify, storeController.findNearStores);
router.get("/:storeId", authentication.verify, storeController.getStoreProducts);

module.exports = router;
