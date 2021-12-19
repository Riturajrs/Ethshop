const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    ethAddress: {type: String, required: true },
    lPrice: {type: Number, required: true },
    hPrice: {type: Number, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
  });
  
  module.exports = mongoose.model('Item', itemSchema);
  