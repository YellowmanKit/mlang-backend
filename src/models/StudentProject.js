import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var studentProjectSchema = mongoose.Schema({
  project: {
    type: ObjectId,
    required: true
  },
  student: {
    type: ObjectId,
    required: true
  }
  cards: [ObjectId]
})

var StudentProject = module.exports = mongoose.model('studentProject', studentProjectSchema);
