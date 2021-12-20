const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Item = require("../models/item");
const User = require("../models/users");

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, lPrice, hPrice, creator } = req.body;

  const createdItem = new Item({
    title,
    description,
    lPrice,
    hPrice,
    image: req.file.filename,
    creator
  });
  try{
      await createdItem.save();
  }catch(err){
      return next(new HttpError("Item could not be saved!!",500));
  }
  res.status(201).json({ item: createdItem });
};

exports.createItem = createItem;
