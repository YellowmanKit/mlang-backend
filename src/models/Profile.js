import mongoose from 'mongoose';
import to from'../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var profileSchema = mongoose.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  joinedSchools: [ObjectId],
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

module.exports.getStudents = async (coursesId)=>{
  let err;
  let profiles = [];
  let profilesId = [];

  [err, profiles] = await to(Profile.find({ joinedCourses: { $in: coursesId } }) );
  for(var i=0;i<profiles.length;i++){
    profilesId = [...profilesId, profiles[i]._id];
  }

  return [err, profiles, profilesId];
}

module.exports.getTeachers = async (schoolId)=>{
  let err;
  let profiles = [];
  let profilesId = [];

  [err, profiles] = await to(Profile.find({ joinedSchools: schoolId }) );
  for(var i=0;i<profiles.length;i++){
    profilesId = [...profilesId, profiles[i]._id];
  }

  return [err, profiles, profilesId];
}
