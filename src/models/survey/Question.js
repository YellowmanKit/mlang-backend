import mongoose from 'mongoose';
import Model from '../Model';
import to from '../../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options: [String]
})

var Question = module.exports = mongoose.model('question',questionSchema);

module.exports.getByQuestionnaires = async (questionnaires)=>{
  var err, data;
  var questions = [];
  var questionsId = [];

  for(var i=0;i<questionnaires.length;i++){
    [err, data] = await to(Question.find({ _id: { $in: questionnaires[i].questions }}));
    for(var key in data){
      questions.push(data[key]);
    }
  }

  for(var j=0;j<questions.length;j++){
    questionsId.push(questions[j]._id);
  }

  return [err, questions, questionsId];
}
