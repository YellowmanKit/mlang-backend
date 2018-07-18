import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User';
import Course from '../../models/Course';
import Project from '../../models/Project';

class ProjectRouter {

  constructor(app){
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

    app.post('/project/add', async(req, res)=>{
      const project = req.body.data;
      console.log(project);
      let err, _newProject, _updatedCourse;
      [err, _newProject] = await to(Project.create(project))
      if(err){ return res.json({ result: 'failed' })}

      [err, _updatedCourse] = await to(Course.findOneAndUpdate({_id: project.course}, { $push: {
        projects: _newProject._id
      }}, {new: true}))
      if(err || _updatedCourse === null){ cb('failed'); };

      return res.json({
        result:'success',
        newProject: _newProject,
        updatedCourse: _updatedCourse
      })
    });

  }

}

export default ProjectRouter;
