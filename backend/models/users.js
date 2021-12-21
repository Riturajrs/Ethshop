const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  wishlist: [{ type: String, required: true}],
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  items: [{ type: mongoose.Types.ObjectId, required: true, ref: "Item" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
