import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var cardSchema = mongoose.Schema({
  studentProject: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  commentAudio: {
    type: String
  },
  grade: {
    type: String,
    default: 'notGraded'
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  langs: [ObjectId]
})

var Card = module.exports = mongoose.model('card',cardSchema);
