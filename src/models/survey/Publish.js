import mongoose from 'mongoose';
import Model from '../Model';
import to from '../../to';

import School from '../School';

var ObjectId = mongoose.Schema.Types.ObjectId;
var publishSchema = mongoose.Schema({
  title: {
    type: String
  },
  questionnaire: {
    type: ObjectId
  },
  school: {
    type: ObjectId
  },
  submits: [ObjectId],
  
  createdAt: {
    type: Date,
  },
  endDate: {
    type: Date
  },
  author: {
    type: ObjectId
  }
})

var Publish = module.exports = mongoose.model('publish',publishSchema);


module.exports.getAssigned = async (profile)=>{
  var err, publishes;
  var publishesId = [];

  [err, publishes] = await to(Publish.find({ school: { $in: profile.joinedSchools }, endDate: { $gt: new Date() } }));

  for(var i=0;i<publishes.length;i++){
    publishesId = [...publishesId, publishes[i]._id];
  }

  return [err, publishes, publishesId];
}

module.exports.getByAuthor = async (userId)=>{
  var err, publishes;
  var publishesId = [];

  [err, publishes] = await to(Publish.find({ author: userId }));

  for(var i=0;i<publishes.length;i++){ publishesId.push(publishes[i]._id); }

  return [err, publishes, publishesId];
}

module.exports.edit = async (data)=>{
  var err, school, publish;
  [err, school] = await to(School.findOne({ code: data.schoolCode }));
  if(!school){ return ['Invalid school code!', null]}

  [err, publish] = await to(Publish.findOneAndUpdate(
    { _id: data.publish._id },
    { $set: { title: data.title, questionnaire: data.questionnaire, school: school._id,
      endDate: data.endDate, author: data.author } },
    { new: true }));
  return [err, publish];
}

module.exports.add = async (data)=>{
  var err, school, publish;
  [err, school] = await to(School.findOne({ code: data.schoolCode }));
  if(!school){ return ['Invalid school code!', null]}

  [err, publish] = await to(Publish.create({
    title: data.title, questionnaire: data.questionnaire, school: school._id,
    endDate: data.endDate, author: data.author, createdAt: new Date()}));
  return [err, publish, school];
}
