const AppError = require("../utils/appError");
const Auction = require("../models/auctionModel");
const Product = require("../models/productModel");

exports.addAuction = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    const currentTime = new Date();
    const endDate = new Date(req.body.endDate);
    const timeDiff = endDate - currentTime;
    if (timeDiff < 0) {
      return next(new AppError("Invalid end time selection", 400));
    }
    const auction = await Auction.create({
      product_id: req.params.productId,
      start_date: new Date(),
      end_date: new Date(req.body.endDate),
    });
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
    const auctions = await Auction.find();
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
    const auctionId = req.params.auctionId;
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return next(new AppError("Auction not available", 404));
    }
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
    const { bid_amount } = req.body;
    const userId = req.user._id;
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) {
      return next(new AppError("Invalid auction id", 404));
    }

    //checking if time limit is exceeded
    if (auction.end_date < Date.now()) {
      return next(new AppError("This auction has been finished", 400));
    }

    const bid = await Auction.findByIdAndUpdate(
      req.params.auctionId,
      { $push: { bidder: { user_id: userId, bid_amount } } },
      { new: true },
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
    const auctionId = req.params.auctionId;
    const bidderList = await Auction.findById(auctionId).select("bidder -_id ");
    if (!bidderList) {
      return next(new AppError("Invalid auction id", 404));
    }
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
    const auctionId = req.params.auctionId;
    const bidderList = await Auction.findById(auctionId).select("-_id ");
    if (!bidderList) {
      return next(new AppError("Invalid auction id", 404));
    }

    if (bidderList.end_date > Date.now()) {
      return next(new AppError("It is not eligible yet", 400));
    }
    //calculating winner
    const winner = bidderList.bidder.reduce((acc, curr) => {
      if (curr.bid_amount > acc.bid_amount) acc = curr;
      return acc;
    });

    //updating auction for winner
    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      {
        auction_winner_id: winner.user_id,
        auction_bid_final_amount: winner.bid_amount,
      },
      { new: true },
    );
    res.json({
      status: "success",
      data: updatedAuction,
    });
  } catch (err) {
    next(err);
  }
};
