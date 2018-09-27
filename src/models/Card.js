import mongoose from 'mongoose';
import StudentProject from './StudentProject';
import to from'../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var cardSchema = mongoose.Schema({
  studentProject: {
    type: ObjectId
  },
  icon: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  audioComment: {
    type: String
  },
  grade: {
    type: String,
    default: 'notGraded'
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  langs: [ObjectId]
})

var Card = module.exports = mongoose.model('card',cardSchema);

module.exports.getByProjects = async (projects)=>{
  let err, studentProject, card;
  let studentProjectsId = [];
  let cardsId = [];
  let cards = [];
  let featured = 0;

  for(var i=0;i<projects.length;i++){
    studentProjectsId = [...studentProjectsId, ...projects[i].studentProjects];
  }

  for(var i=0;i<studentProjectsId.length;i++){
    [err, studentProject] = await to(StudentProject.findById(studentProjectsId[i]));
    cardsId = [...cardsId, ...studentProject.cards];
  }

  for(var i=0;i<cardsId.length;i++){
    [err, card] = await to(Card.findById(cardsId[i]));
    cards = [...cards, card];
    if(card.grade === 'featured'){ featured++; }
  }

  return [err, cards, cardsId, featured];
}
