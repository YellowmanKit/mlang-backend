import mongoose from 'mongoose';
import Model from '../Model';
import to from '../../to';

import Profile from '../Profile';

import Publish from './Publish';
import Answer from './Answer';


var ObjectId = mongoose.Schema.Types.ObjectId;
var submitSchema = mongoose.Schema({
  publish: {
    type: ObjectId
  },
  questionnaire: {
    type: ObjectId
  },
  submittedBy: {
    type: ObjectId
  },
  createdAt: {
    type: Date,
  },
  answers: [ObjectId]
})

var Submit = module.exports = mongoose.model('submit', submitSchema);

module.exports.getMultiple = async (submitsId)=>{
  var err, profile, data;
  var submits = [];
  var answers = [];
  var profiles = [];
  [err, submits] = await to(Submit.find({ _id: { $in: submitsId }}));

  for(var i=0;i<submits.length;i++){
    [err, profile] = await to(Profile.findOne({ belongTo: submits[i].submittedBy }));
    profiles = [...profiles, profile];

    [err, data] = await to(Answer.find({ _id: { $in: submits[i].answers }}));
    answers = [...answers, ...data];
  }
  return [err, submits, answers, profiles];
}

module.exports.getByUserAndPublishesId = async (userId, publishesId)=>{
  var err, submit;
  var submits = [];
  var submitsId = [];

  for(var i=0;i<publishesId.length;i++){
    [err, submit] = await to(Submit.findOne({ publish: publishesId[i], submittedBy: userId }))
    if(submit){
      submits = [...submits, submit];
      submitsId = [...submitsId, submit._id];
    }
  }
  return [err, submits, submitsId];
}

module.exports.edit = async (data)=>{
  var err, answer, submit;
  var answers = [];
  var answersId = [];
  const rawAnswers = data.answers;
  //console.log(data);
  for(var key in rawAnswers){
    if(rawAnswers[key].answer){
      [err, answer] = await Answer.edit(rawAnswers[key])
    }else{
      [err, answer] = await Answer.add({ submit: data.submit._id, question: key, value: rawAnswers[key].value});
    }
    answers.push(answer);
    answersId.push(answer._id);
  }

  [err, submit] = await to(Submit.findOneAndUpdate(
    { _id: data.submit, },
    { answers: answersId },
    { new: true }
  ));

  return [err, submit, answers];
}

module.exports.add = async (data)=>{
  var err, answer, submit, publish;
  var answers = [];
  var answersId = [];
  const rawAnswers = data.answers;

  [err, submit] = await to(Submit.create({ publish: data.publish, questionnaire: data.questionnaire, submittedBy: data.submittedBy, createdAt: new Date() }));

  [err, publish] = await to(Publish.findOneAndUpdate(
    { _id: submit.publish },
    { $push: { submits: submit._id }},
    { new: true }
  ));

  for(var key in rawAnswers){
    [err, answer] = await Answer.add({ submit: submit._id, question: key, value: rawAnswers[key].value});
    answers = [...answers, answer];
    answersId = [...answersId, answer._id];
  }

  [err, submit] = await to(Submit.findOneAndUpdate({ _id: submit._id },{ answers: answersId},{ new: true }));

  return [err, submit, answers];
}
