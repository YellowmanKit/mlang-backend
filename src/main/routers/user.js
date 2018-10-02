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

      let profiles = [];
      let schools = [];
      let courses = [];
      let subjects = [];
      let projects = [];
      let studentProhects = [];

      let err, data, user, profile;
      [err, user, profile] = await User.getUserAndProfile(id, pw);
      if(err){ return res.json({ result: "failed" }); }

      profiles = [profile];

      let teacherProfiles;
      [err, data, teacherProfiles] = await Course.getJoined(profile.joinedCourses);
      if(err){ return res.json({ result: "failed" }); }

      courses = [...courses, ...data];
      profiles = [...profiles, ...teacherProfiles];

      let joinedSubjects;
      [err, data, joinedSubjects] = await Subject.getByCourses(data);
      if(err){ return res.json({ result: "failed" }); }

      subjects = [...subjects, ...data];

      let joinedProjects;
      [err, data, joinedProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var teachingCourses = [];
      [err, data, teachingCourses] = await Course.getTeaching(user._id);
      if(err){ return res.json({ result: "failed" });}

      courses = [...courses, ...data];

      var teachingSubjects = [];
      [err, data, teachingSubjects] = await Subject.getByCourses(data);
      if(err){ return res.json({ result: "failed" });}

      subjects = [...subjects, ...data];

      let teachingProjects;
      [err, data, teachingProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var studentProjects = [];
      [err, studentProjects] = await to(StudentProject.find({student: user._id}));
      if(err){ return res.json({ result: "failed" });}

      var supervisingSchools = [];
      [err, data, supervisingSchools] = await School.getByUser(user._id, profile);
      if(err){ return res.json({ result: "failed" });}

      schools = [...schools, ...data];

      var adminUsers = [];
      [err, data, adminUsers] = await User.getByType('admin');

      var admins = [];

      [err, data, admins] = await User.getProfilesByUsers(data);
      if(err){ return res.json({ result: "failed" });}

      profiles = [...profiles, ...data];

      return res.json({
        result: "success",
        user: user,
        profile: profile,
        profiles: profiles,

        admins: admins,
        supervisingSchools: supervisingSchools,

        teachingCourses: teachingCourses,
        joinedCourses: profile.joinedCourses,

        teachingSubjects: teachingSubjects,
        joinedSubjects: joinedSubjects,

        teachingProjects: teachingProjects,
        joinedProjects: joinedProjects,

        schools: schools,
        courses: courses,
        subjects: subjects,
        projects: projects,
        studentProjects: studentProjects
      })
    });

  }

}

export default UserRouter;
