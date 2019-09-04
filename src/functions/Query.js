import to from '../to';

import Profile from '../models/Profile';
import User from '../models/User';
import School from '../models/School';
import Course from '../models/Course';
import Subject from '../models/Subject';
import Project from '../models/Project';
import StudentProject from '../models/StudentProject';
import Card from '../models/Card';
import Lang from '../models/Lang';
import Log from '../models/Log';

import Publish from '../models/survey/Publish';
import Submit from '../models/survey/Submit';
import Question from '../models/survey/Question';
import Answer from '../models/survey/Answer';

import Graph from './Graph';

module.exports.getStatisticsByPublish = async (publishId)=>{
  var err, answer, question;
  var stat= {
    submits: [],
    answers: [],

    answerOptionGraphData: {}
  }

  var submits = [];
  [err, submits] = await to(Submit.find({ publish: publishId }));
  stat['submits'] = submits;

  var answers = [];
  for(var i=0;i<submits.length;i++){
    [err, answer] = await to(Answer.find({ _id: { $in: submits[i].answers }}));
    answers = [...answers, ...answer];
  }
  stat['answers'] = answers;

  var options = {};
  for(var j=0;j<answers.length;j++){
    [err, question] = await to(Question.findOne({ _id: answers[j].question }));
    if(!options[question._id] && question.type === 'option'){ options[question._id] = question.options }
  }

  stat['answerOptionGraphData'] = Graph.answerOption(stat['answers'], options);

  return [err, stat];
}

module.exports.getStatisticsByUser = async (userId)=>{
  var err, data;
  var stat= {
    userStudentProjects: [],
    userCards: [],
    userLangs: [],
    userFeaturedLangs: [],
    userProjects: [],
    userSubjects: [],
    userCourses: [],

    studentProjects: [],
    cards: [],
    langs: [],
    featuredLangs: [],
    projects: [],
    subjects: [],
    courses: [],

    featuredCount: 0,
    likeCount: 0,
    langCharCount: 0,
    langCharFreq: {},

    cardDateGraphData: [],
    cardMonthGraphData: []
  };

  var studentProjectsId = [];
  [err, data, studentProjectsId] = await StudentProject.getByUser(userId);

  stat['userStudentProjects'] = studentProjectsId;
  stat['studentProjects'] = data;

  var cardsId = [];
  [err, data, cardsId] = await Card.getByStudentProjects(stat['studentProjects']);

  stat['userCards'] = cardsId;
  stat['cards'] = data;

  var langsId = [];
  [err, data, langsId] = await Lang.getByCards(stat['cards']);

  stat['userLangs'] = langsId;
  stat['langs'] = data;

  var featuredLangsId = [];
  [err, data, featuredLangsId] = await Lang.getByCards(stat['cards'], true);

  stat['userFeaturedLangs'] = featuredLangsId;
  stat['featuredLangs'] = data;

  var projectsId = [];
  [err, data, projectsId] = await Project.getByStudentProjects(stat['studentProjects']);

  stat['userProjects'] = projectsId;
  stat['projects'] = data;

  var subjectsId = [];
  [err, data, subjectsId] = await Subject.getByProjects(stat['projects']);

  stat['userSubjects'] = subjectsId;
  stat['subjects'] = data;

  var coursesId = [];
  [err, data, coursesId] = await Course.getBySubjects(stat['subjects']);

  stat['userCourses'] = coursesId;
  stat['courses'] = data;

  for(var i=0;i<stat.cards.length;i++){
    if(stat.cards[i].grade === 'featured'){
      stat.featuredCount++;
      if(stat.cards[i].likeCount){ stat.likeCount += stat.cards[i].likeCount; }
    }
  }

  const langCharStat =  mostlyUsedCharInLangs(stat.langs);
  stat['langCharFreq'] = langCharStat.langCharFreq;
  stat['langCharCount'] = langCharStat.langCharCount;


  stat['cardDateGraphData'] = Graph.cardDate(stat['cards']);
  stat['cardMonthGraphData'] = Graph.cardMonth(stat['cards']);

  //console.log(stat);
  return [err, stat];
}

module.exports.getStatisticsByCourse = async (courseId)=>{
  var err, data, course;
  var stat= {
    course: null,
    courseStudents: [],
    courseProjects: [],
    courseStudentProjects: [],
    courseCards: [],
    courseLangs: [],

    profiles: [],
    subjects: [],
    projects: [],
    studentProjects: [],
    cards: [],
    langs: [],

    featuredCount: 0,
    cardDateGraphData: [],
    cardMonthGraphData: [],
    cardStudentGraphData: []
  };

  [err, course] = await to(Course.findById(courseId));
  stat['course'] = course;

  var profilesId = [];
  [err, data, profilesId] = await Profile.getStudentsByCoursesId([courseId]);

  stat['courseStudents'] = profilesId;
  stat['profiles'] = [...stat['profiles'], ...data];

  [err, data] = await to(Subject.find({ _id: { $in: course.subjects }}));
  stat['subjects'] = data;

  var projectsId = [];
  [err , data, projectsId] = await Project.getBySubjects(data);

  stat['courseProjects'] = projectsId;
  stat['projects'] = data;

  var studentProjectsId = [];
  [err , data, studentProjectsId] = await StudentProject.getByProjects(data);

  stat['courseStudentProjects'] = studentProjectsId;
  stat['studentProjects'] = data;

  var cardsId = [];
  var featured = 0;
  [err, data, cardsId, featured] = await Card.getByStudentProjects(stat['studentProjects']);

  stat['courseCards'] = cardsId;
  stat['cards'] = data;
  stat['featuredCount'] = featured;

  var langsId = [];
  [err, data, langsId] = await Lang.getByCards(stat['cards']);

  stat['courseLangs'] = langsId;
  stat['langs'] = data;

  stat['cardDateGraphData'] = Graph.cardDate(stat['cards']);
  stat['cardMonthGraphData'] = Graph.cardMonth(stat['cards']);
  stat['cardStudentGraphData'] = Graph.cardStudent(stat['cards'], course.teacher);


  //console.log(stat);
  return [err, stat];
}

module.exports.getStatisticsBySchool = async (schoolId)=>{
  var err, data, school;
  var stat= {
    schoolTeachers: [],
    schoolStudents: [],
    schoolCourses: [],
    schoolSubjects: [],
    schoolProjects: [],
    schoolCards: [],
    schoolLangs: [],

    profiles: [],
    courses: [],
    subjects: [],
    projects: [],
    cards: [],
    langs: [],

    featuredCount: 0,
    cardDateGraphData: [],
    cardMonthGraphData: [],
    loginDateGraphData: []
  };

  [err, school] = await to(School.findById(schoolId));
  var coursesId = [];
  [err, data, coursesId] = await Course.getBySchool(school);

  stat['schoolCourses'] = coursesId;
  stat['courses'] = data;

  var subjectsId = [];
  [err, data, subjectsId] = await Subject.getByCourses(data, true);

  stat['schoolSubjects'] = subjectsId;
  stat['subjects'] = data;

  var projectsId = [];
  [err, data, projectsId] = await Project.getBySubjects(data);

  stat['schoolProjects'] = projectsId;
  stat['projects'] = data;

  var cardsId = [];
  var featuredCount = 0;
  [err, data, cardsId, featuredCount] = await Card.getByProjects(data);

  stat['schoolCards'] = cardsId;
  stat['cards'] = data;
  stat['featuredCount'] = featuredCount;

  var langsId = [];
  [err, data, langsId] = await Lang.getByCards(data);

  stat['schoolLangs'] = langsId;
  stat['langs'] = data;

  var profilesId = [];
  [err, data, profilesId] = await Profile.getTeachersBySchool(schoolId);

  stat['schoolTeachers'] = profilesId;
  stat['profiles'] = data;

  [err, data, profilesId] = await Profile.getStudentsByCoursesId(stat.schoolCourses);

  stat['schoolStudents'] = profilesId;
  stat['profiles'] = [...stat.profiles, ...data];

  stat['cardDateGraphData'] = Graph.cardDate(stat['cards']);
  stat['cardMonthGraphData'] = Graph.cardMonth(stat['cards']);

  [err, data] = await Log.getMultipleByProfiles(stat.profiles);

  stat['loginDateGraphData'] = Graph.loginDate(data);

  return [err, stat];
}

var mostlyUsedCharInLangs = (langs) =>{
  var stat = { langCharFreq: {}, langCharCount: 0 };
  const skipChar = ['，', '。','1','2','3','4','5','6','7','8','9','0']
  for(var i=0;i<langs.length;i++){
    const txt = langs[i].text;
    const key = langs[i].key;

    stat.langCharCount += txt.length;
    for(var j=0;j<txt.length;j++){
      if(skipChar.indexOf(txt[j]) > -1){ continue; }
      if(!stat.langCharFreq[key]){ stat.langCharFreq[key] = {}; }
      if(!stat.langCharFreq[key][txt[j]]){ stat.langCharFreq[key][txt[j]] = 0; }
      stat.langCharFreq[key][txt[j]]++;
    }
    stat.langCharFreq[key] = sortNumuriObject(stat.langCharFreq[key]);
  }
  //console.log(stat);
  return stat;
}

var sortNumuriObject = (objectToSort) =>{
  var sortable = [];
  for (var item in objectToSort){ sortable.push([item, objectToSort[item]]); }
  sortable.sort((a, b)=> { return b[1] - a[1]; });

  var objectToReturn = {};
  for (var i = 0;i<sortable.length;i++){ objectToReturn[sortable[i][0]] = sortable[i][1] }

  return objectToReturn;
}
