const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const userObj = { ...req.body };
    if (!userObj.email || !userObj.password) {
      throw new AppError("Missing required fields", 400);
    }

    //hashing the password
    userObj.password = await bcrypt.hash(userObj.password, 12);
    const newUser = await User.create(userObj);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and password exists
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
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};
