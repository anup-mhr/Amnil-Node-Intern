const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../databasePg");

const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getAllUsers = async () => {
  const result = await pool.query("SELECT * from users");
  return result.rows;
};

exports.createUser = async (userData) => {
  if (!userData.email || !userData.password) {
    throw new AppError("Missing required fields", 400);
  }

  if (userData.password.length < 8) {
    throw new AppError("Password must be at least 8 characters", 400);
  }

  //hashing the password
  userData.password = await bcrypt.hash(userData.password, 12);

  let query = "INSERT into users(email, password";
  let values = "values($1, $2";

  const parameters = [userData.email, userData.password];

  if (userData.role) {
    query += ", role";
    values += ", $" + (parameters.length + 1);
    parameters.push(userData.role);
  }

  if (userData.username) {
    query += ", username";
    values += ", $" + (parameters.length + 1);
    parameters.push(userData.username);
  }
  if (userData.photo) {
    query += ", photo";
    values += ", $" + (parameters.length + 1);
    parameters.push(userData.photo);
  }
  query += `) ${values}) RETURNING user_id, email, role`;

  const newUser = (await pool.query(query, parameters)).rows[0];

  const token = signToken(newUser.user_id);

  return { newUser, token };
};

exports.login = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  //2) check if user exist and password is correct
  const user = (await pool.query("select * from users where email=$1", [email])).rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  // 3) if everything is ok send token to user
  const token = signToken(user.user_id);

  return token;
};

exports.updateUser = async (id, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }

  let query = `UPDATE users SET `;
  const parameters = [];
  let index = 1;
  for (const key in userData) {
    if (index > 1) {
      query += ",";
    }
    query += `${key}=$${index}`;
    parameters.push(userData[key]);
    index++;
  }
  query += ` WHERE user_id=${id} RETURNING *`;

  const user = (await pool.query(query, parameters)).rows[0];

  if (!user) {
    throw new AppError("User not available", 404);
  }
  return user;
};

exports.deleteUser = async (id) => {
  await pool.query("delete from users where user_id=$1", [id]);
};
