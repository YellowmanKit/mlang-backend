import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var subjectSchema = mongoose.Schema({
  course: {
    type: ObjectId,
    required: true
  },
  projects: {
    type: [ObjectId]
  },
  icon: {
    type: String
  },
  title: {
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
  }
})

var Subject = module.exports = mongoose.model('subject',subjectSchema);
