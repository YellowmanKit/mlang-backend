import mongoose from 'mongoose';
import to from'../to';

//import School from './School';

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

/*module.exports.getByUsers = async (users)=>{
  let err,data;

  let profile = [];
  let profiles = [];
  let profilesId = [];

  for(var i=0;i<users.length;i++){
    [err, profile] = await to(Profile.findOne({ belongTo: users[i]._id }) );

    if(users[i].type === 'admin'){
      let supervisingSchools = [];
      [err, data, supervisingSchools] = await School.getByUser(users[i], profile);
      profile = {...profile._doc, supervisingSchools: supervisingSchools};
    }
    profiles = [...profiles, profile];
    profilesId = [...profilesId, profile._id];
  }
  return [err, profiles, profilesId];
}*/

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
