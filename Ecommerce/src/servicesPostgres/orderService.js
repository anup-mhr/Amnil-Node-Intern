const AppError = require("../utils/appError");
const pool = require("../../databasePg");

exports.getAllOrders = async () => {
  return (await pool.query("SELECT * FROM orders")).rows;
};

exports.checkoutOrder = async (userId, cartId) => {
  let query = `SELECT
    cart_id,
    cart_item ->> 'quantity' AS quantity,
    p.price AS product_price
  FROM
    carts
  CROSS JOIN LATERAL jsonb_array_elements(carts.cart_items) AS cart_item      --expand the cart_items array into separate rows
  JOIN
    products p ON (cart_item ->> 'product_id')::INT = p.product_id
  WHERE
    cart_id = ${cartId};`;
  const cart = (await pool.query(query)).rows;

  if (!cart || cart.length === 0) {
    throw new AppError("Your cart is empty", 404);
  }

  //calculating total price
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].quantity * cart[i].product_price;
  }

  const newOrder = (
    await pool.query("INSERT INTO orders(user_id, cart_id, total) values($1,$2,$3) RETURNING *", [
      userId,
      cartId,
      totalPrice,
    ])
  ).rows[0];

  return newOrder;
};
