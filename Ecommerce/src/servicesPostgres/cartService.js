const AppError = require("../utils/appError");
const pool = require("../../databasePg");

exports.getAllCarts = async () => {
  return (await pool.query("SELECT * FROM carts")).rows;
};

exports.addToCart = async (userId, productData) => {
  //validate product
  const product = await (
    await pool.query("SELECT * FROM products where product_id=$1", [productData.product_id])
  ).rows[0];
  if (!product) {
    throw new AppError("Product is not available", 404);
  }

  //check whether user has cart
  let userCart = (await pool.query("SELECT * FROM carts where user_id=$1", [userId])).rows;

  //EXECUTING THE QUERY
  let cart, query;
  if (!userCart || userCart.length === 0) {
    query = `INSERT INTO carts(user_id, cart) values(${userId},'[${JSON.stringify(productData)}]') RETURNING *`;
  } else {
    query = `UPDATE carts
    SET cart = cart || '[${JSON.stringify(productData)}]'::jsonb
    WHERE user_id = ${userId} RETURNING *;`;
  }
  cart = (await pool.query(query)).rows[0];

  return cart;
};

exports.getCartByUserId = async (userId) => {
  let query = `SELECT * FROM carts where user_id=${userId}`;
  return (await pool.query(query)).rows;
};
