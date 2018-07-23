import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var langSchema = mongoose.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  audio: {
    type: String
  }
})

var Lang = module.exports = mongoose.model('lang', langSchema);
