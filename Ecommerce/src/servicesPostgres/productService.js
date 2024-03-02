const pool = require("../../databasePg");
const AppError = require("../utils/appError");

exports.getAllproducts = async () => {
  return (await pool.query("SELECT * from products")).rows;
};

exports.createProduct = async (files, productData) => {
  if (files.image) {
    productData.images = files.image.map((file) => file.filename);
  }
  if (files.coverImage) {
    productData.coverImage = files.coverImage[0].filename;
  }

  let query = "INSERT into products(";
  let values = "values(";
  const parameters = [];
  let index = 1;
  for (const key in productData) {
    if (index > 1) {
      query += ",";
      values += ",";
    }
    query += key === "coverImage" ? "cover_image" : key;
    values += `$${index}`;
    if (key === "price" || key === "quantity") {
      parameters.push(parseFloat(productData[key]));
    } else {
      parameters.push(productData[key]);
    }
    index++;
  }

  query += `) ${values} ) RETURNING *`;

  return (await pool.query(query, parameters)).rows[0];
};

exports.updateProduct = async (id, data) => {
  let query = `UPDATE products SET `;
  const parameters = [];
  let index = 1;
  for (const key in data) {
    if (index > 1) {
      query += ",";
    }
    query += `${key}=$${index}`;
    parameters.push(data[key]);
    index++;
  }
  query += ` WHERE product_id=${id} RETURNING *`;

  const newProduct = (await pool.query(query, parameters)).rows[0];
  if (!newProduct) {
    throw new AppError("Product not found", 404);
  }
  return newProduct;
};

exports.updateProductQantity = async (id, data) => {
  if (!data.quantity) {
    throw new AppError("Invalid quantity provided", 400);
  }
  const newProduct = (
    await pool.query("UPDATE products SET quantity=$1 where product_id=$2 RETURNING *", [
      parseInt(data.quantity),
      id,
    ])
  ).rows[0];
  if (!newProduct) {
    throw new AppError("Product not found", 404);
  }
  return newProduct;
};

exports.deleteProduct = async (id) => {
  await pool.query("DETELE from product where product_id=$1", id);
};

exports.searchProduct = async (queryString) => {
  const queryObj = { ...queryString };

  let query = "SELECT * FROM products";

  //FILTERING
  if (queryObj.productType) {
    query += ` where product_type='${queryObj.productType}'`;
  }

  if (queryObj.q) {
    query += `${queryObj.productType ? "AND" : "WHERE"} name LIKE '${queryObj.q}%'`;
  }

  if (queryObj.sortBy) {
    query += ` ORDER BY ${queryObj.sortBy}`;
  }
  if (queryObj.limit) {
    query += ` LIMIT ${queryObj.limit}`;
  }

  if (queryObj.page) {
    const { limit, page } = queryObj;
    if (page < 1) {
      throw new AppError("Invalid page number", 400);
    }
    const offset = limit ? limit * (page - 1) : 10 * (page - 1);
    query += ` OFFSET ${offset}`;
  }

  //execute query
  return (await pool.query(query)).rows;
};

exports.quantityLessThan5 = async () => {
  return (await pool.query("SELECT * FROM products where quantity<5")).rows;
};
