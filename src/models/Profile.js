import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;
var profileSchema = mongoose.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String,
    default: ''
  },

  joinedCourses: [ObjectId],

  cardCount: {
    type: Number,
    default: 0
  },
  featuredCount: {
    type: Number,
    default: 0
  }
})

var Profile = module.exports = mongoose.model('profile',profileSchema);
