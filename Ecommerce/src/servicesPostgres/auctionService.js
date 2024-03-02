const AppError = require("../utils/appError");
const pool = require("../../databasePg");

exports.getAllAuctions = async () => {
  return (await pool.query("SELECT * FROM auctions")).rows;
};

exports.getAuctionById = async (auctionId) => {
  const auction = (await pool.query("SELECT * FROM auctionS where auction_id=$1", [auctionId]))
    .rows[0];
  if (!auction) {
    throw new AppError("Auction not available", 404);
  }
  return auction;
};

exports.createAuction = async (productId, endDate) => {
  const currentTime = new Date();
  endDate = new Date(endDate);
  const timeDiff = endDate - currentTime;
  if (timeDiff < 0) {
    throw new AppError("Invalid end time selection", 400);
  }
  const auction = (
    await pool.query("INSERT INTO auctions(product_id, end_date) values ($1, $2) RETURNING *;", [
      productId,
      endDate,
    ])
  ).rows[0];
  return auction;
};

exports.bidAuction = async (auctionId, userId, bid_amount) => {
  const auction = (await pool.query("SELECT * FROM auctions where auction_id=$1", [auctionId]))
    .rows[0];
  if (!auction) {
    throw new AppError("Invalid auction id", 404);
  }
  //checking if time limit is exceeded
  if (auction.end_date < Date.now()) {
    throw new AppError("This auction has been finished", 400);
  }

  const bid = await (
    await pool.query(
      "INSERT INTO bidders(auction_id, user_id, bid_amount) values ($1, $2, $3) RETURNING *",
      [auctionId, userId, bid_amount],
    )
  ).rows[0];

  return bid;
};

exports.getBiddersOfAuctionItem = async (auctionId) => {
  const bidderList = (await pool.query("SELECT * FROM bidders where auction_id=$1", [auctionId]))
    .rows;
  if (!bidderList) {
    throw new AppError("Invalid auction id", 404);
  }
  return bidderList;
};

exports.decideAuctionWinner = async (auctionId) => {
  let query = `SELECT a.auction_id, a.product_id, a.end_date, b.user_id, b.bid_amount FROM auctions a 
      join bidders b ON  a.auction_id= b.auction_id 
      where a.auction_id=${auctionId};`;
  const auction = (await pool.query(query)).rows;

  if (auction.end_date > Date.now()) {
    throw new AppError("It is not eligible yet", 400);
  }
  //calculating winner
  const winner = auction.reduce((acc, curr) => {
    if (curr.bid_amount > acc.bid_amount) acc = curr;
    return acc;
  });

  const updatedAuction = (
    await pool.query(
      "UPDATE auctions SET auction_winner_id=$1, auction_bid_final_amount=$2 where auction_id=$3 RETURNING *;",
      [winner.user_id, winner.bid_amount, auctionId],
    )
  ).rows[0];

  return updatedAuction;
};
