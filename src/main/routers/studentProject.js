import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import StudentProject from '../../models/StudentProject';

class StudentProjectRouter {

  constructor(app){
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.get('/studentProject/get/', async (req, res, next)=>{
      const studentId = req.headers.student;
      const projectId = req.headers.project;
      //console.log(studentId)
      //console.log(projectId)

      let err, _studentProject;
      [err, _studentProject] = await to(StudentProject.findOneAndUpdate({student: studentId, project: projectId },{}, {upsert: true, new: true}))
      if(err || _studentProject === null){ return res.json({ result: "failed" });}

      return res.json({
        result: 'success',
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
