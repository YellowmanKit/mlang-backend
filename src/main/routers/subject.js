import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';
import Course from '../../models/Course.js';
import Project from '../../models/Project.js';
import Subject from '../../models/Subject.js';

class SubjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/subject/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, subject;
      var subjects = [];
      for(var i=0;i<list.length;i++){
        [err, subject] = await to(Subject.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        subjects.splice(0,0,subject);
      }
      return res.json({
        result:'success',
        subjects: subjects
      })
    });

    app.post('/subject/edit', async(req, res, next)=>{
      const subject = req.body.data;
      //console.log(data)
      let err, editedSubject;
      [err, editedSubject] = await to(Subject.findOneAndUpdate({_id: project._id},{ $set: subject }, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedSubject: editedSubject
      })
    });

    app.post('/subject/add', async(req, res)=>{
      const subject = req.body.data;
      console.log(subject);
      let err, newSubject, updatedCourse;
      [err, newSubject] = await to(Subject.create(subject))
      if(err){ return res.json({ result: 'failed' })}

      [err, updatedCourse] = await to(Course.findOneAndUpdate({_id: subject.course}, { $push: {
        subjects: newSubject._id
      }}, {new: true}))
      if(err || updatedCourse === null){ cb('failed'); };

      return res.json({
        result:'success',
        newSubject: newSubject,
        updatedCourse: updatedCourse
      })
    });

  }

}

export default SubjectRouter;
