const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Item = require("../models/item");
const User = require("../models/users");

const conn = mongoose.createConnection(
  `mongodb+srv://MegaProjectUser:8Qy7ueuhWLTh5fZG@cluster0.ccgat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, lPrice, hPrice } = req.body;

  const createdItem = new Item({
    title,
    description,
    image: req.file.filename,
    imageId: req.file.id,
    lPrice,
    hPrice,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(createdItem.creator);
  } catch (err) {
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err });
      }
    );
    const error = new HttpError(
      "User authentication failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err });
      }
    );
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdItem.save({ session: sess });
    user.items.push(createdItem);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    gfs.delete(
      new mongoose.Types.ObjectId(createdItem.imageId),
      (err, data) => {
        if (err) return res.json({ error: err });
      }
    );
    const error = new HttpError("Creating item failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ item: createdItem.toObject({ getters: true }) });
};

const getImage = (req, res) => {
  console.log(req.params.filename);
  gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ error: err });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
};


const deleteImage = (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.json({ error: err });

    res.status(200).json({ message: "success" });
  });
};

exports.createItem = createItem;
exports.getImage = getImage;
exports.deleteImage = deleteImage;
