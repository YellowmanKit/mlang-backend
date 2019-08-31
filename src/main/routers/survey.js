import Router from './Router';
import path from 'path';
import to from '../../to';

import Questionnaire from '../../models/survey/Questionnaire.js';
import Publish from '../../models/survey/Publish.js';

class SurveyRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;

    app.post('/survey/publish/edit', async(req, res, next)=>{
      const data = req.body.data;

      let err, publish;
      [err, publish] = await Publish.edit(data);

      if(err){ return res.json({ result: 'failed to edit publish' })}

      return res.json({
        result: 'success',
        updatedPublish: publish
      })
    });

    app.post('/survey/publish/add', async(req, res, next)=>{
      const data = req.body.data;

      let err, publish, school;
      [err, publish, school] = await Publish.add(data);

      return res.json({
        result: err? 'failed': 'success',
        updatedPublish: publish,
        school: school
      })
    });

    app.post('/survey/questionnaire/edit', async(req, res, next)=>{
      const data = req.body.data;

      let err, questionnaire, questions;
      [err, questionnaire, questions] = await Questionnaire.edit(data);

      if(err){ return res.json({ result: 'failed to add questionnaire' })}

      return res.json({
        result: 'success',
        updatedQuestions: questions,
        updatedQuestionnaire: questionnaire
      })
    });

    app.post('/survey/questionnaire/add', async(req, res, next)=>{
      const data = req.body.data;

      let err, questionnaire, questions;
      [err, questionnaire, questions] = await Questionnaire.add(data);

      if(err){ return res.json({ result: 'failed to add questionnaire' })}

      return res.json({
        result: 'success',
        updatedQuestions: questions,
        updatedQuestionnaire: questionnaire
      })
    });


  }

}

export default SurveyRouter;
