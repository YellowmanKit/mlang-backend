import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var projectSchema = mongoose.Schema({
  course: {
    type: ObjectId,
    required: true
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
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  studentProjects: [ObjectId]
})

var Project = module.exports = mongoose.model('project',projectSchema);
