import mongoose from 'mongoose';
import Model from '../Model';
import to from '../../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var answerSchema = mongoose.Schema({
  submit: {
    type: ObjectId
  },
  question: {
    type: ObjectId
  },
  value: {
    type: String
  }
})

var Answer = module.exports = mongoose.model('answer', answerSchema);

module.exports.getBySubmits = async (submits)=>{
  var err, data;
  var answers = [];
  for(var i=0;i<submits.length;i++){
    [err, data] = await to(Answer.find({ _id: { $in: submits[i].answers  }}));
    answers = [...answers, ...data]
  }
  return [err, answers]
}

module.exports.edit = async (data)=>{
  var err, answer;

  [err, answer] = await to(Answer.findOneAndUpdate(
    { _id: data.answer },
    { $set: { value: data.value } },
    { new: true }));
  return [err, answer];
}

module.exports.add = async (data)=>{
  var err, answer;
  [err, answer] = await to(Answer.create({ submit: data.submit, question: data.question, value: data.value }));
  return [err, answer];
}
