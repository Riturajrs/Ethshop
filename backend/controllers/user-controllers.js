const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email,password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    next(
      new HttpError("Could not log you in,please check and try again ", 500)
    );
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  res.json({ userId: existingUser.id, email: existingUser.email });
};


const userSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 15);
  } catch (err) {
    next(new HttpError("Hashing password failed!!", 500));
  }
  const createdUser = new User({
    name,
    email,
    wishlist: [],
    password: hashedPassword,
    items: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email });
};


const getUserItems = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  if (existingUser) {
    res.status(200).json({
      username: username,
      items: existingUser.items,
      wishlist: existingUser.wishlist,
    });
  } else {
    const newUser = new User({ username: username, items: [], wishlist: [] });
    try {
      await newUser.save();
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }
    res.status(201).json({ username: username, items: [], wishlist: [] });
  }
};
const addwishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, wishlistid } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  let wishlistArray = existingUser.wishlist;
  wishlistArray.push(wishlistid);
  existingUser.wishlist = wishlistArray;
  try {
    await existingUser.save();
  } catch (err) {
    return next(new HttpError("Item could not be added to wishlist!!", 500));
  }
  res.status(201).json({
    username: username,
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
const removewishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, wishlistid } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  let wishlistArray = existingUser.wishlist;
  console.log(wishlistid);
  wishlistArray = wishlistArray.filter((item) => item !== wishlistid);
  existingUser.wishlist = wishlistArray;
  try {
    await existingUser.save();
  } catch (err) {
    return next(
      new HttpError("Item could not be removed from wishlist!!", 500)
    );
  }
  res.status(200).json({
    username: username,
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
const getwishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  res.status(200).json({
    wishlist: existingUser.wishlist,
  });
};
exports.getUserItems = getUserItems;
exports.getwishlist = getwishlist;
exports.removewishlist = removewishlist;
exports.addwishlist = addwishlist;
exports.userLogin = userLogin;
exports.userSignup = userSignup;
