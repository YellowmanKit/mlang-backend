import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var schoolSchema = mongoose.Schema({
  icon: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    required: true
  },
})

var School = module.exports = mongoose.model('school',schoolSchema);
