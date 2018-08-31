import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';
import Course from '../../models/Course.js';
import Project from '../../models/Project.js';
import Subject from '../../models/Subject.js';

class ProjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/project/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, project;
      var _projects = [];
      for(var i=0;i<list.length;i++){
        [err, project] = await to(Project.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        _projects.splice(0,0,project);
      }
      return res.json({
        result:'success',
        projects: _projects
      })
    });

    app.post('/project/edit', async(req, res, next)=>{
      const project = req.body.data;
      //console.log(data)
      let err, editedProject;
      [err, editedProject] = await to(Project.findOneAndUpdate({_id: project._id},{ $set: project }, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedProject: editedProject
      })
    });

    app.post('/project/add', async(req, res)=>{
      const project = req.body.data;
      console.log(project);
      let err, newProject, updatedSubject;
      [err, newProject] = await to(Project.create(project))
      if(err){ return res.json({ result: 'failed' })}

      [err, updatedSubject] = await to(Subject.findOneAndUpdate({_id: project.subject}, { $push: {
        projects: newProject._id
      }}, {new: true}))
      if(err || updatedSubject === null){ cb('failed'); };

      return res.json({
        result:'success',
        newProject: newProject,
        updatedSubject: updatedSubject
      })
    });

  }

}

export default ProjectRouter;
