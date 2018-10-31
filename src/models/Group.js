import mongoose from 'mongoose';
import to from'../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var groupSchema = mongoose.Schema({
  name: {
    type: String
  },
  project: {
    type: ObjectId,
    required: true
  },
  students: [ObjectId],
  leader: {
    type: ObjectId
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

var Group = module.exports = mongoose.model('group', groupSchema);
