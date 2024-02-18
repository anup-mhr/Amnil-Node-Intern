const express = require('express');
const auctionController = require('./../controllers/auctionController')

const router = express.Router();

router.route("/")
    .get(auctionController.getAllAuctions)

router.route('/:auctionId')
    .get(auctionController.getAuctionById)

router.route('/:productId')
    .post(auctionController.addAuction)

router.route('/bid/:auctionId')
    .get(auctionController.getBidders)
    .post(auctionController.bidAuction)

router.route('/calculate/:auctionId')
    .get(auctionController.decideAuctionWinner)

module.exports = router;