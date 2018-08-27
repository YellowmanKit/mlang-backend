import mongoose from 'mongoose';
import randomString from'randomstring';
import to from'../to';

import Profile from './Profile';

var ObjectId = mongoose.Schema.Types.ObjectId;
var courseSchema = mongoose.Schema({
  teacher: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String
  },
  joinedStudents: [ObjectId],
  projects: [ObjectId]
})

var Course = module.exports = mongoose.model('course',courseSchema);

module.exports.leaveCourse = async (data, cb)=>{
  let err, courseToLeave, updatedProfile;

  [err, courseToLeave] = await to(Course.findOneAndUpdate({code: data.code}, { $pull: {
    joinedStudents: data.userId
  }}, {new: true}))
  if(err || courseToLeave === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $pull: {
    joinedCourses: courseToLeave._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  cb('success', courseToLeave, updatedProfile)
}

module.exports.joinCourse = async (data, cb)=>{
  let err, courseToJoin, updatedProfile;

  [err, courseToJoin] = await to(Course.findOneAndUpdate({code: data.code}, { $push: {
    joinedStudents: data.userId
  }}, {new: true}))
  if(err || courseToJoin === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $push: {
    joinedCourses: courseToJoin._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  cb('success', courseToJoin, updatedProfile)
}

module.exports.addCourse = async (newCourse, cb)=>{
  let err, course;

  var newCode = '';
  for(var i=0;i<99;i++){
    newCode = randomString.generate({
      length: 5,
      charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
    });

    [err,course] = await to(Course.findOne({code: newCode}));
    if(!err && course === null){ break; };
  }

  newCourse['code'] = newCode;

  [err, course] = await to(Course.create(newCourse));
  if(err){ cb('failed'); console.log(err); return; }

  //console.log(course)
  cb('success', course)
}
