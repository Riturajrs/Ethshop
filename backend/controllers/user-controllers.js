const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");

const userLogin = async (req, res, next) => {
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
      wishlist: existingUser.wishlist,
      items: existingUser.items,
    });
  } else {
    const newUser = new User({ username: username, wishlist: [], items: [] });
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
    username: username,
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
exports.getUserItems = getUserItems;
exports.getwishlist = getwishlist;
exports.removewishlist = removewishlist;
exports.addwishlist = addwishlist;
exports.userLogin = userLogin;