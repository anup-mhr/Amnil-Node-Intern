const auctionService = require("../services/auctionService");

exports.addAuction = async (req, res, next) => {
  try {
    const auction = await auctionService.createAuction(req.params.productId, req.body.endDate);
    res.json({
      status: "success",
      data: auction,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAuctions = async (req, res, next) => {
  try {
    const auctions = await auctionService.getAllAuctions();
    res.json({
      status: "success",
      result: auctions.length,
      data: auctions,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuctionById = async (req, res, next) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.auctionId);
    res.json({
      status: "success",
      data: auction,
    });
  } catch (err) {
    next(err);
  }
};

exports.bidAuction = async (req, res, next) => {
  try {
    const bid = await auctionService.bidAuction(
      req.params.auctionId,
      req.user._id,
      req.body.bid_amount,
    );

    res.json({
      status: "success",
      data: bid,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBidders = async (req, res, next) => {
  try {
    const bidderList = await auctionService.getBiddersOfAuctionItem(req.params.auctionId);
    res.json({
      status: "success",
      data: bidderList,
    });
  } catch (err) {
    next(err);
  }
};

exports.decideAuctionWinner = async (req, res, next) => {
  try {
    const updatedAuction = await auctionService.decideAuctionWinner(req.params.auctionId);
    res.json({
      status: "success",
      data: updatedAuction,
    });
  } catch (err) {
    next(err);
  }
};
