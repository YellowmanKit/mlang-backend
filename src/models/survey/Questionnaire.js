import mongoose from 'mongoose';
import Model from '../Model';
import to from '../../to';

import Question from './Question';
import Publish from './Publish';

var ObjectId = mongoose.Schema.Types.ObjectId;
var questionaireSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date
  },
  questions: [ObjectId]
})

var Questionnaire = module.exports = mongoose.model('questionnaire',questionaireSchema);

module.exports.getAssigned = async (profile)=>{
  var err, quest, publishes;
  var quests = [];
  var questsId = [];

  [err, publishes] = await to(Publish.find({ school: { $in: profile.joinedSchools }, endDate: { $gt: new Date() } }));

  for(var i=0;i<publishes.length;i++){
    [err, quest] = await to(Questionnaire.findOne({ _id: publishes[i].questionnaire }));
    quests = [...quests, quest];
  }

  for(var i=0;i<quests.length;i++){ questsId.push(quests[i]._id); }

  return [err, quests, questsId];
}

module.exports.getByAuthor = async (userId)=>{
  var err, quests;
  var questsId = [];

  [err, quests] = await to(Questionnaire.find({ author: userId }));

  for(var i=0;i<quests.length;i++){ questsId.push(quests[i]._id); }

  return [err, quests, questsId];
}

module.exports.edit = async (data)=>{
  const editQuestions = data.newEditQuestions;
  var err, question, questionnaire;
  var questions = [];
  var questionsId = [];

  for(var i=0;i<editQuestions.length;i++){
    var options = [];
    for(var j=0;j<editQuestions[i].options.length;j++){
      options.push(editQuestions[i].options[j].name)
    }
    if(editQuestions[i]._id){
      [err, question] = await to(Question.findOneAndUpdate(
        { _id: editQuestions[i]._id, },
        { title: editQuestions[i].title, type: editQuestions[i].type, options: options},
        { new: true }
      ));
    }else{
      [err, question] = await to(Question.create({ title: editQuestions[i].title, type: editQuestions[i].type, options: options}));
    }
    questions.push(question);
    questionsId.push(question._id);
  }
  [err, questionnaire] = await to(Questionnaire.findOneAndUpdate(
    { _id: data.questionnaire._id, },
    {title: data.newTitle, questions: questionsId},
    { new: true }
  ));

  return [err, questionnaire, questions];
}

module.exports.add = async (data)=>{
  const editQuestions = data.editQuestions;
  var err, question, questionnaire;
  var questions = [];
  var questionsId = [];

  for(var i=0;i<editQuestions.length;i++){
    var options = [];
    for(var j=0;j<editQuestions[i].options.length;j++){
      options.push(editQuestions[i].options[j].name)
    }
    [err, question] = await to(Question.create({ title: editQuestions[i].title, type: editQuestions[i].type, options: options}));
    questions.push(question);
    questionsId.push(question._id);
  }
  [err, questionnaire] = await to(Questionnaire.create({title: data.title, author: data.author, questions: questionsId, createdAt: new Date()}));

  return [err, questionnaire, questions];
}
