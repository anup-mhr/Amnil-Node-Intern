const pool = require("../../databasePg");

exports.getAllStore = async () => {
  return (await pool.query("SELECT * FROM stores")).rows;
};

exports.createStore = async (userId, file, data) => {
  const { name, type, coordinates } = data;
  const store = (
    await pool.query(
      "INSERT INTO stores (name, logo, type, location, user_id) VALUES ($1, $2, $3, POINT($4, $5), $6) RETURNING *;",
      [name, file.filename, type, coordinates[0], coordinates[1], userId],
    )
  ).rows[0];
  return store;
};

exports.getProductsOfStore = async (storeId) => {
  const store = await pool.query(
    "select s.store_id, s.name as store_name, s.location, p.product_id, p.name as product_name from stores s inner join products p on s.store_id = p.store_id where s.store_id= $1;",
    [storeId],
  );
  return store.rows;
};

exports.StoresNearInMeter = async (meter, location) => {
  let query = `SELECT *
                FROM
                  stores
                WHERE
                  sqrt(
                      pow(location[0] - ${location.longitude}, 2) + pow(location[1] - ${location.latitude}, 2)
                  ) * 111.32 <= 1.0; -- 1.0 km in degrees`;
  const stores = (await pool.query(query)).rows;
  // const { longitude, latitude } = location;

  return stores;
};
