import Router from './Router';
import path from 'path';
import to from '../../to';

import Questionnaire from '../../models/survey/Questionnaire.js';
import Publish from '../../models/survey/Publish.js';
import Submit from '../../models/survey/Submit.js';

import Query from '../../functions/Query.js';

class SurveyRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;

    app.post('/survey/submit/edit', async(req, res, next)=>{
      const data = req.body.data;

      var err, submit, answers;
      [err, submit, answers] = await Submit.edit(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedSubmit: submit,
        updatedAnswers: answers
      })
    });

    app.post('/survey/submit/add', async(req, res, next)=>{
      const data = req.body.data;

      var err, submit, answers;
      [err, submit, answers] = await Submit.add(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedSubmit: submit,
        updatedAnswers: answers
      })
    });

    app.post('/survey/publish/getSubmitted', async(req, res, next)=>{
      const publish = req.body.data;
      //console.log(schoolId)

      var err, submits, answers, profiles;
      [err, submits, answers, profiles] = await Submit.getMultiple(publish.submits);
      if(err){ return res.json({result: 'failed'})}
      return res.json({ result: 'success', submits: submits, answers: answers, profiles: profiles })

    });

    app.post('/survey/publish/getStatistics', async(req, res, next)=>{
      const publishId = req.body.data;
      //console.log(schoolId)

      var err, statistics;
      [err, statistics] = await Query.getStatisticsByPublish(publishId);
      if(err){ return res.json({result: 'failed'})}
      return res.json({ result: 'success', statistics: statistics })

    });

    app.post('/survey/publish/edit', async(req, res, next)=>{
      const data = req.body.data;

      var err, publish;
      [err, publish] = await Publish.edit(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedPublish: publish
      })
    });

    app.post('/survey/publish/add', async(req, res, next)=>{
      const data = req.body.data;

      var err, publish, school, questionnaire;
      [err, publish, school] = await Publish.add(data);

      if(publish){
        [err, questionnaire] = await to(Questionnaire.findOneAndUpdate(
          { _id: publish.questionnaire },
          { $set: { published: true } },
          { new: true }
        ));
      }

      return res.json({
        result: err? 'failed': 'success',
        updatedPublish: publish,
        updatedQuestionnaire: questionnaire,
        school: school
      })
    });

    app.post('/survey/questionnaire/edit', async(req, res, next)=>{
      const data = req.body.data;

      var err, questionnaire, questions;
      [err, questionnaire, questions] = await Questionnaire.edit(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedQuestions: questions,
        updatedQuestionnaire: questionnaire
      })
    });

    app.post('/survey/questionnaire/add', async(req, res, next)=>{
      const data = req.body.data;

      var err, questionnaire, questions;
      [err, questionnaire, questions] = await Questionnaire.add(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedQuestions: questions,
        updatedQuestionnaire: questionnaire
      })
    });


  }

}

export default SurveyRouter;
