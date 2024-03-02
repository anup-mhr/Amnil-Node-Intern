const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getAllUsers = async () => {
  return await User.find();
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
  const newUser = await User.create(userData);

  const token = signToken(newUser._id);

  return { newUser, token };
};

exports.login = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  //2) check if user exist and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  // 3) if everything is ok send token to user
  const token = signToken(user._id);

  return token;
};

exports.updateUser = async (id, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true, //this will return new updated document
    runValidators: true,
  });
  if (!user) {
    throw new AppError("User not available", 404);
  }
  return user;
};

exports.deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};
