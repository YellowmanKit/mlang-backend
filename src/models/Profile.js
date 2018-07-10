import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var profileSchema = mongoose.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String
  },
  joinedCourse: [ObjectId],
  teachingCourse: [ObjectId],
  projects: [ObjectId],
  studentProjects: [ObjectId],
  cardCount: {
    type: Number,
    default: 0
  },
  featuredCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var Profile = module.exports = mongoose.model('profile',profileSchema);
