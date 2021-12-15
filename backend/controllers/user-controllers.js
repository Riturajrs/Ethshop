const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");

const getUserItems = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username } = req.body;
  let existingUser;
  existingUser = await User.findOne({ username: username });
  if (existingUser) {
    res.status(200).json({ username: username, items: existingUser.items });
  } else {
    const newUser = new User({ username: username, items: [] });
    try {
      await newUser.save();
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }
    res.status(201).json({ username: username, items: [] });
  }
};
exports.getUserItems = getUserItems;
