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

module.exports.getByAuthor = async (userId)=>{
  var err, publishes;
  var publishesId = [];

  [err, publishes] = await to(Publish.find({ author: userId }));

  for(var i=0;i<publishes.length;i++){ publishesId.push(publishes[i]._id); }

  return [err, publishes, publishesId];
}

module.exports.edit = async (data)=>{
  var err, publish;
  [err, publish] = await to(Publish.findOneAndUpdate(
    { _id: data.publish._id },
    { $set: { title: data.title, questionnaire: data.questionnaire, schoolCode: data.schoolCode, endDate: data.endDate, author: data.author } },
    { new: true }));
  return [err, publish];
}

module.exports.add = async (data)=>{
  var err, school, publish;
  const schoolCode = data.schoolCode;
  [err, school] = await to(School.findOne({ code: schoolCode }));
  if(!school){ return ['Invalid school code!', null]}

  [err, publish] = await to(Publish.create({ title: data.title, questionnaire: data.questionnaire, school: school, endDate: data.endDate, author: data.author, createdAt: new Date()}));
  return [err, publish, school];
}
