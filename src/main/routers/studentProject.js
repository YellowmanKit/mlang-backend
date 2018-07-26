import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import StudentProject from '../../models/StudentProject';
import Project from '../../models/Project';
import Profile from '../../models/Profile';

class StudentProjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/studentProject/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, studentProject, profile;
      var _studentProjects = [];
      var _studentProfiles = [];
      for(var i=0;i<list.length;i++){
        [err, studentProject] = await to(StudentProject.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        _studentProjects.splice(0,0, studentProject);

        [err, profile] = await to(Profile.findOne({belongTo: studentProject.student}));
        if(err || profile === null){ return res.json({ result: 'failed' })}
        _studentProfiles.splice(0,0, profile);
      }
      return res.json({
        result:'success',
        studentProjects: _studentProjects,
        students: _studentProfiles
      })
    });

    app.get('/studentProject/get/', async (req, res, next)=>{
      const studentId = req.headers.student;
      const projectId = req.headers.project;
      //console.log(studentId)
      //console.log(projectId)

      let err, _studentProject, _project;
      [err, _studentProject] = await to(StudentProject.findOneAndUpdate({student: studentId, project: projectId },{}, {upsert: true, new: true}))
      if(err || _studentProject === null){ return res.json({ result: "failed" });}

      [err, _project] = await to(Project.findById(projectId));
      if(err || _project === null){ return res.json({ result: "failed" });}

      if(!_project.studentProjects.some(sp=>{return sp.equals(_studentProject._id)}) ){
        [err, _project] = await to(Project.findOneAndUpdate({_id: projectId}, { $push:{
          studentProjects: _studentProject._id
        }}, {new: true}));
        if(err || _project === null){ return res.json({ result: "failed" });}
      }

      return res.json({
        result: 'success',
        updatedProject: _project,
        studentProject: _studentProject
      })

    });

    /*app.post('/studentProject/add', async(req, res, next)=>{
      console.log('studentProject/add')
      const data = req.body.data;
      let err, _studentProject;
      [err, _studentProject] = await to(StudentProject.create({project: data.project, student: data.student}));
      if(err || _studentProject === null){ return res.json({ result: "failed" });}

      return res.json({
        result: 'success',
        studentProject: _studentProject
      })

    })*/

  }


}

export default StudentProjectRouter;
