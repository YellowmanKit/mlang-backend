import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import Card from '../../models/Card';
import Lang from '../../models/Lang';
import StudentProject from '../../models/StudentProject';

class CardRouter {

  constructor(app){
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/card/getMultiple', async(req, res)=>{
      const list = req.body.data.cards;
      //console.log(list);
      let err, card, langs;
      var _cards = [];
      for(var i=0;i<list.length;i++){
        [err, card] = await to(Card.findById(list[i]));
        if(err || card === null){ console.log('no such card!'); return res.json({ result: 'failed' })}
        _cards.splice(0,0,card);
      }

      var _langs = [];
      for(var j=0;j<_cards.length;j++){
        [err, langs] = await to(Lang.find({card: list[j]}));
        if(err || langs === null || langs.length === 0){ console.log('card hv no lang!'); return res.json({ result: 'failed' })}
        _langs = [..._langs, ...langs]
      }

      return res.json({
        result: 'success',
        cards: _cards,
        langs: _langs
      })
    });

    app.post('/card/add', async(req, res, next)=>{
      const data = req.body.data;
      var card = data.card;
      var langs = data.langs;

      let err, _studentProject, createdCard, createdLang;

      if(card.studentProject.project === undefined){
        [err, _studentProject] = await to(StudentProject.create({project: data.project, student: card.author}));
        if(err || _studentProject === null){ return res.json({ result: "failed" });}
        card.studentProject = _studentProject;
      }

      [err, createdCard] = await to(Card.create(card))
      if(err || createdCard === null){ return res.json({ result: "failed" });}

      var createdLangs = []
      var createdLangsId = [];
      for(var i=0;i<langs.length;i++){
        langs[i].card = createdCard._id;
        [err, createdLang] = await to(Lang.create(langs[i]));
        if(err || createdLang === null){ return res.json({ result: "failed" });}
        createdLangs.splice(0,0,createdLang);
        createdLangsId.splice(0,0,createdLang._id);
      }

      [err, createdCard] = await to(Card.findOneAndUpdate({_id: createdCard._id}, { $set: {
        langs: createdLangsId
      }}, {new: true}))
      if(err || createdCard === null){ return res.json({ result: "failed" });}

      [err, _studentProject] = await to(StudentProject.findOneAndUpdate({_id: card.studentProject._id}, { $push: {
        cards: createdCard._id
      }}, {new: true}))
      if(err || createdCard === null){ return res.json({ result: "failed" });}

      res.json({
        result: 'success',
        card: createdCard,
        langs: createdLangs,
        updatedStudentProject: _studentProject
      })

    })

  }


}

export default CardRouter;
