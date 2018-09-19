import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import User from '../../models/User.js';
import Profile from '../../models/Profile.js';
import School from '../../models/School.js';
import Course from '../../models/Course.js';
import Subject from '../../models/Subject.js';
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
      let err, existedUser;
      [err, existedUser] = await to(User.findOne({id: data.id, pw: data.pw}));
      if(err){ console.log(err); return res.json({ result: 'failed'})}
      if(existedUser && existedUser._id.toString() !== data._id){ console.log('user id/pw already used'); return res.json({ result: 'failed'}) }

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

      let err, user, profile, othersProfile, course, subject, project, studentProject, school;
      var profiles = [];

      [err, user] = await to(User.findOne({id, pw}));
      if(err || !user){ console.log(err); console.log(user); return res.json({ result: "failed" });}

      [err, profile] = await to(Profile.findOne({belongTo: user._id}));
      if(err || profile === null){ return res.json({ result: "failed" });}
      profiles.push(profile);

      var courses = [];
      var subjects = [];

      var joinedCourses = profile.joinedCourses;
      var joinedSubjects = [];

      const today = new Date();

      for(var i=0;i<joinedCourses.length;i++){
        [err, course] = await to(Course.findById(joinedCourses[i]));
        if(err || course === null){ return res.json({ result: "failed" });}

        courses.push(course);

        [err, othersProfile] = await to(Profile.findOne({belongTo: course.teacher}));
        if(err || othersProfile === null){ return res.json({ result: "failed" });}
        profiles.push(othersProfile);

        const endDate = new Date(course.endDate);
        if(endDate < today){ continue; }
        joinedSubjects = [...joinedSubjects, ...course.subjects];
      }

      for(var i=0;i<joinedSubjects.length;i++){
        [err, subject] = await to(Subject.findById(joinedSubjects[i]._id));
        if(err || subject === null){ return res.json({ result: "failed" });}
        subjects.push(subject)
      }

      var teachingCourses = [];
      var teachingSubjects = [];

      var teachingCoursesData = [];
      [err, teachingCoursesData] = await to(Course.find({teacher: user._id}, null, {sort: {endDate: 'ascending'}}));
      if(err){ return res.json({ result: "failed" });}
      courses = [...courses, ...teachingCoursesData];

      for(var i=0;i<teachingCoursesData.length;i++){
        teachingCourses.push(teachingCoursesData[i]._id);
        const endDate = new Date(teachingCoursesData[i].endDate);
        if(endDate < today){ continue; }
        teachingSubjects = [...teachingSubjects, ...teachingCoursesData[i].subjects];
      }

      for(var i=0;i<teachingSubjects.length;i++){
        [err, subject] = await to(Subject.findById(teachingSubjects[i]._id));
        if(err || subject === null){ return res.json({ result: "failed" });}
        subjects.push(subject)
      }

      var studentProjects = [];
      [err, studentProjects] = await to(StudentProject.find({student: user._id}));

      var schools = [];
      var supervisingSchools = [];
      [err, schools] = await(to(School.find({admin: user._id})));
      if(err || schools === null){ return res.json({ result: "failed" });}
      schools.map(school=>{
        supervisingSchools.push(school._id);
        return null;
      });

      const joinedSchools = profile.joinedSchools;
      for(var i=0;i<joinedSchools.length;i++){
        [err, school] = await to(School.findById(joinedSchools[i]));
        if(err || school === null){ return res.json({ result: "failed" });}
        schools.push(school);
      }

      return res.json({
        result: "success",
        user: user,
        profile: profile,
        profiles: profiles,

        supervisingSchools: supervisingSchools,

        teachingCourses: teachingCourses,
        joinedCourses: joinedCourses,

        teachingSubjects: teachingSubjects,
        joinedSubjects: joinedSubjects,

        schools: schools,
        courses: courses,
        subjects: subjects,
        studentProjects: studentProjects
      })
    });

  }

}

export default UserRouter;
