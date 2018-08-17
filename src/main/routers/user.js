import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import User from '../../models/User.js';
import Profile from '../../models/Profile.js';
import Course from '../../models/Course.js';
import Project from '../../models/Project.js';
import StudentProject from '../../models/StudentProject.js';

class UserRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/mlang');
    var db = mongoose.connection;

    app.post('/user/update', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)
      User.findOneAndUpdate({_id: data._id}, { $set:{
        type: data.type,
        id: data.id,
        pw: data.pw,
        email: data.email
      }}, {new: true}, (err, updatedUser)=>{
        //console.log(_updatedUser)
        return res.json({
          result: (err || !updatedUser)? 'failed':'success' ,
          updatedUser: updatedUser
        });
      });
    });

    app.get('/user/resetPassword/', async (req, res, next)=>{
      const email = req.headers.email;

      User.resetPassword(email, result=>{
        return res.json({ result: result });
      });
    });

    app.get('/user/getNewAccount/', (req, res, next)=>{
      const email = req.headers.email;

      User.acquireNewAccount(email, result=>{
        return res.json({ result: result });
      });
    });

    app.get('/user/login/', async (req, res, next)=>{
      const id = req.headers.id;
      const pw = req.headers.pw;
      let err, user, profile, course, project, studentProject;

      [err, user] = await to(User.findOne({id, pw}));
      if(err || user === null){ return res.json({ result: "failed" });}

      [err, profile] = await to(Profile.findOne({belongTo: user._id}));
      if(err || profile === null){ return res.json({ result: "failed" });}

      var courses = [];
      var projects = [];

      var joinedCourses = profile.joinedCourses;
      var joinedProjects = [];

      const today = new Date();

      for(var i=0;i<joinedCourses.length;i++){
        [err, course] = await to(Course.findById(joinedCourses[i]));
        if(err || course === null){ return res.json({ result: "failed" });}
        const endDate = new Date(course.endDate);
        if(endDate < today){
          joinedCourses.splice(i, 1);
          i--;
          continue;
        }
        courses.push(course);
        joinedProjects = [...joinedProjects, ...course.projects];
      }

      var studentProjects = [];
      for(var j=0;j<joinedProjects.length;j++){
        [err, project] = await to(Project.findById(joinedProjects[j]));
        if(err || project === null){ return res.json({ result: "failed" });}
        projects.push(project);

        [err, studentProject] = await to(StudentProject.findOne({project: project._id, student: user._id}));
        if(studentProject){ studentProjects.push(studentProject); }
      }


      var teachingCourses = [];
      var teachingProjects = [];

      var teachingCoursesData = [];
      [err, teachingCoursesData] = await to(Course.find({teacher: user._id}));
      if(err){ return res.json({ result: "failed" });}
      courses = [...courses, ...teachingCoursesData];
      teachingCoursesData.map(course=>{
        const endDate = new Date(course.endDate);
        if(endDate < today){
          return;
        }
        return teachingCourses.push(course._id);
      })

      for(var k=0;k<teachingCoursesData.length;k++){
        const endDate = new Date(teachingCoursesData[k].endDate);
        if(endDate < today){
          continue;
        }
        teachingProjects = [...teachingProjects, ...teachingCoursesData[k].projects];
      }

      for(var l=0;l<teachingProjects.length;l++){
        [err, project] = await to(Project.findById(teachingProjects[l]));
        if(err || project === null){ return res.json({ result: "failed" });}
        projects.push(project);
      }

      return res.json({
        result: "success",
        user: user,
        profile: profile,

        teachingCourses: teachingCourses,
        joinedCourses: joinedCourses,

        teachingProjects: teachingProjects,
        joinedProjects: joinedProjects,

        studentProjects: studentProjects,

        courses: courses,
        projects: projects
      })
    });

  }

}

export default UserRouter;
