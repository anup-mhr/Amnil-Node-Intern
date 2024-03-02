const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRES_PORT,
});

pool.on("connect", () => {
  console.log("connected to pg db");
});

pool.on("release", () => {
  console.log("connection terminated");
});

module.exports = pool;
