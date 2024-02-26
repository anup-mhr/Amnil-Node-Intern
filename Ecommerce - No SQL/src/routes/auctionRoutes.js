const express = require("express");
const auctionController = require("../controllers/auctionController");
const authentication = require("../../middleware/authentication");

const router = express.Router();

router.get("/", authentication.verify, auctionController.getAllAuctions);

router.get("/:auctionId", authentication.verify, auctionController.getAuctionById);

router.post(
  "/:productId",
  authentication.verify,
  authentication.restrictTo("admin", "seller"),
  auctionController.addAuction,
);

router
  .route("/bid/:auctionId")
  .get(
    authentication.verify,
    authentication.restrictTo("admin", "seller"),
    auctionController.getBidders,
  )
  .post(authentication.verify, auctionController.bidAuction);

router.get(
  "/calculate/:auctionId",
  authentication.verify,
  authentication.restrictTo("admin", "seller"),
  auctionController.decideAuctionWinner,
);

module.exports = router;
