const AppError = require("../utils/appError");
const Auction = require("../models/auctionModel");
const Product = require("../models/productModel");

exports.getAllAuctions = async () => {
  return await Auction.find();
};

exports.getAuctionById = async (auctionId) => {
  const auction = await Auction.findById(auctionId);
  if (!auction) {
    throw new AppError("Auction not available", 404);
  }
  return auction;
};

exports.createAuction = async (productId, endDate) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const currentTime = new Date();
  endDate = new Date(endDate);
  const timeDiff = endDate - currentTime;
  if (timeDiff < 0) {
    throw new AppError("Invalid end time selection", 400);
  }
  const auction = await Auction.create({
    product_id: productId,
    start_date: new Date(),
    end_date: endDate,
  });
  return auction;
};

exports.bidAuction = async (auctionId, userId, bid_amount) => {
  const auction = await Auction.findById(auctionId);

  if (!auction) {
    throw new AppError("Invalid auction id", 404);
  }

  //checking if time limit is exceeded
  if (auction.end_date < Date.now()) {
    throw new AppError("This auction has been finished", 400);
  }

  const bid = await Auction.findByIdAndUpdate(
    auctionId,
    { $push: { bidder: { user_id: userId, bid_amount } } },
    { new: true },
  );
  return bid;
};

exports.getBiddersOfAuctionItem = async (auctionId) => {
  const bidderList = await Auction.findById(auctionId).select("bidder -_id ");
  if (!bidderList) {
    throw new AppError("Invalid auction id", 404);
  }
  return bidderList;
};

exports.decideAuctionWinner = async (auctionId) => {
  const auction = await this.getAuctionById(auctionId);

  if (auction.end_date > Date.now()) {
    throw new AppError("It is not eligible yet", 400);
  }
  //calculating winner
  const winner = auction.bidder.reduce((acc, curr) => {
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

  return updatedAuction;
};
