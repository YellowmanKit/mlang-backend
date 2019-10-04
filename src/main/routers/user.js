import Router from './Router';
import path from 'path';
import to from '../../to';
import Excel from 'exceljs';

import Query from '../../functions/Query.js';
import User from '../../models/User.js';
import Profile from '../../models/Profile.js';
import School from '../../models/School.js';
import Course from '../../models/Course.js';
import Subject from '../../models/Subject.js';
import Project from '../../models/Project.js';
import StudentProject from '../../models/StudentProject.js';
import Group from '../../models/Group.js';

import Card from '../../models/Card.js';
import Lang from '../../models/Lang.js';

import Questionnaire from '../../models/survey/Questionnaire.js';
import Question from '../../models/survey/Question.js';
import Publish from '../../models/survey/Publish.js';
import Submit from '../../models/survey/Submit.js';
import Answer from '../../models/survey/Answer.js';

import Log from '../../models/Log.js';

class UserRouter extends Router {

  constructor(app, mlanghku){
    super(app);
    this.app = app;
    this.mlanghku = mlanghku;
    this.init();
  }

  init(){
    const app = this.app;
    const mlanghku = this.mlanghku;
    
    const upload = app.get('upload');
    const temp = app.get('temp');

    app.post('/user/excel', upload.single('file'),async(req, res, next)=>{

      const excel = new Excel.Workbook();

      excel.xlsx.readFile(temp + req.file.originalname).then(workbook => {
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow(async (row, rowIndex) => {
            if(rowIndex != 1){
              var id = row.getCell(1).value;
              var pw = row.getCell(2).value;
              var codeType = row.getCell(3).value;
              var code = row.getCell(4).value;

              //console.log("id: " + id);
              //console.log("pw: " + pw);
              //console.log("codeType: " + codeType);
              //console.log("code: " + code);

              var err;
              var user;

              [err, user] = await User.acquireNewAccountByCode(code, codeType);
              if(err){ console.log(err); return res.json({ result: 'failed'});}

              //console.log(user);

              var err, existedUser;
              [err, existedUser] = await to(User.findOne({id: user.id}));

              if(err){ console.log(err); return res.json({ result: 'failed'});}
              //if(existedUser && existedUser._id.toString() !== user._id){ console.log('user id/pw already used'); }

              User.findOneAndUpdate({_id: user._id}, { $set: {"id": id} }, {new: true}, (err, updatedUser)=>{
                if(err){
                  console.log("something wrong when updating user");
                  return res.json({ result: 'update user failed'});
                }
              });

              Profile.findOneAndUpdate({belongTo: user._id}, { $set: {"name": id, "icon": "0-profileIcon.png"}}, (err, updateProfile) =>{
                if(err){
                  console.log("something wrong when updating profile");
                  return res.json({ result: 'update profile failed'});
                }
              });
            }
          })
        })
      })

      return res.json({result: 'success'});
    });

    app.post('/user/addAdmin', async(req, res, next)=>{
      const userId = req.body.data.userId;
      //console.log(userId);
      var err, updatedUser;
      [err, updatedUser] = await to(User.findOneAndUpdate({id: userId},{$set:{type:'admin'}},{new: true}))
      if(err){ console.log(err); return res.json({ result: 'failed'})}

      var profiles = [];
      var admins = [];
      [err, profiles, admins] = await User.getProfilesByUsers([updatedUser]);
      if(err){ console.log(err); return res.json({ result: 'failed'})}

      return res.json({
        result: 'success',
        updatedUser: updatedUser,
        profiles: profiles,
        admins: admins
      });
    });

    app.post('/user/update', async(req, res, next)=>{
      const data = req.body.data;
      var err, existedUser;
      [err, existedUser] = await to(User.findOne({id: data.id, pw: data.pw}));
      if(err){ console.log(err); return res.json({ result: 'failed'})}
      if(existedUser && existedUser._id.toString() !== data._id){ console.log('user id/pw already used'); return res.json({ result: 'failed'}) }

      User.findOneAndUpdate({_id: data._id}, { $set: data }, {new: true}, (err, updatedUser)=>{
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

    app.get('/user/getNewAccountByCode/', async (req, res, next)=>{
      const code = req.headers.code;
      const codeType = req.headers.type;

      var err, user;

      [err, user] = await User.acquireNewAccountByCode(code, codeType);
      if(err){ return res.json({ result: 'failed'})}

      return res.json({ result: 'success', id: user.id, pw: user.pw });
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

      //console.log(id + ' ' + pw);

      var err, data, user, profile, appUser;
      [err, user, profile] = await User.getUserAndProfile(id, pw);
      if(err){
        [err, appUser] = await mlanghku.login(id, pw);
        if(err){ console.log(err); return res.json({ result: "failed" }); }
        [err, user, profile] = await User.aquireNewAccountByAppAccount(appUser.attributes, pw);
      }
      //console.log(user);
      //console.log(profile);

      Log.createLoginLog(user._id);

      var profiles = [];
      var schools = [];
      var courses = [];
      var subjects = [];
      var projects = [];
      var studentProjects = [];
      var groups = [];
      var cards = [];
      var langs = [];

      var questionnaires = [];
      var questions = [];
      var publishes = [];
      var submits = [];
      var answers = [];

      if(profile.joinedSchools.length === 0 && profile.joinedCourses.length > 0){
        [err, data] = await to(Course.findOne({ _id: profile.joinedCourses[0] }));
        [err, data] = await to(User.findOne({ _id: data.teacher }));
        [err, data] = await to(Profile.findOne({ belongTo: data._id }));
        [err, data] = await to(School.findOne({ _id: data.joinedSchools[0] }));
        schools = [...schools, data];
        [err, data, profile] = await School.joinSchool({ user: user, code: data.code});
      }

      profiles = [profile];

      var teacherProfiles;
      [err, data, teacherProfiles] = await Course.getJoined(profile.joinedCourses);
      if(err){ return res.json({ result: "failed" }); }

      courses = [...courses, ...data];
      profiles = [...profiles, ...teacherProfiles];

      var joinedSubjects;
      [err, data, joinedSubjects] = await Subject.getByCourses(data);
      if(err){ return res.json({ result: "failed" }); }

      subjects = [...subjects, ...data];

      var joinedProjects;
      [err, data, joinedProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var joinedStudentProjects;
      [err, data, joinedStudentProjects] = await StudentProject.getByProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      studentProjects = [...studentProjects, ...data];

      var joinedCards;
      [err, data, joinedCards] = await Card.getByStudentProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      cards = [...cards, ...data];

      var joinedGroups;
      [err, data, joinedGroups] = await Group.getByUserAndProjects(user._id, joinedProjects);
      if(err){ return res.json({ result: "failed" }); }

      groups = [...groups, ...data];





      var teachingCourses;
      [err, data, teachingCourses] = await Course.getTeaching(user._id);
      if(err){ return res.json({ result: "failed" });}

      courses = [...courses, ...data];

      var teachingSubjects;
      [err, data, teachingSubjects] = await Subject.getByCourses(data.slice(0).reverse());
      if(err){ return res.json({ result: "failed" });}

      subjects = [...subjects, ...data];

      var teachingProjects;
      [err, data, teachingProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var teachingStudentProjects;
      [err, data, teachingStudentProjects] = await StudentProject.getByProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      studentProjects = [...studentProjects, ...data];

      var teachingCards;
      [err, data, teachingCards] = await Card.getByStudentProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      cards = [...cards, ...data];

      var teachingGroups;
      [err, data, teachingGroups] = await Group.getByProjects(teachingProjects);
      if(err){ return res.json({ result: "failed" }); }

      groups = [...groups, ...data];



      var supervisingSchools;
      [err, data, supervisingSchools] = await School.getByUser(user._id, profile);
      if(err){ return res.json({ result: "failed" });}

      schools = [...schools, ...data];

      var adminUsers;
      [err, data, adminUsers] = await User.getByType('admin');

      var admins = [];

      [err, data, admins] = await User.getProfilesByUsers(data);
      if(err){ return res.json({ result: "failed" });}

      profiles = [...profiles, ...data];




      var profilesId;
      [err, data, profilesId] = await Profile.getByStudentProjects(studentProjects);
      if(err){ return res.json({ result: "failed" }); }

      profiles = [...profiles, ...data];

      var langsId;
      [err, data, langsId] = await Lang.getByCards(cards);
      if(err){ return res.json({ result: "failed" }); }

      langs = [...langs, ...data];





      var createdQuestionnaires = [];
      [err, data, createdQuestionnaires] = await Questionnaire.getByAuthor(user._id);
      questionnaires = [...questionnaires, ...data];

      var assignedPublishes = [];
      [err, data, assignedPublishes] = await Publish.getAssigned(profile);
      publishes = [...publishes, ...data];


      var createdSubmits = [];
      [err, data, createdSubmits] = await Submit.getByUserAndPublishesId(user._id, assignedPublishes);
      submits = [...submits, ...data];

      [err, data] = await Answer.getBySubmits(data);
      answers = [...answers, ...data];


      [err, data] = await Questionnaire.getByPublishes(publishes);
      questionnaires = [...questionnaires, ...data];

      [err, data] = await Question.getByQuestionnaires(questionnaires);
      questions = [...questions, ...data];



      var createdPublishes = [];
      [err, data, createdPublishes] = await Publish.getByAuthor(user._id);
      publishes = [...publishes, ...data];

      [err, data] = await School.getByPublishes(publishes);
      schools = [...schools, ...data];




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

        teachingStudentProjects: teachingStudentProjects,
        joinedStudentProjects: joinedStudentProjects,

        teachingCards: teachingCards,
        joinedCards: joinedCards,

        assignedPublishes: assignedPublishes,
        createdQuestionnaires: createdQuestionnaires,
        createdPublishes: createdPublishes,
        createdSubmits: createdSubmits,

        schools: schools,
        courses: courses,
        subjects: subjects,
        projects: projects,
        studentProjects: studentProjects,
        groups: groups,
        cards: cards,
        langs: langs,

        questionnaires: questionnaires,
        questions: questions,
        publishes: publishes,
        submits: submits,
        answers: answers
      })
    });

  }

}

export default UserRouter;
