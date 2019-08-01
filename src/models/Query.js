import to from '../to';
import Profile from './Profile';
import User from './User';
import School from './School';
import Course from './Course';
import Subject from './Subject';
import Project from './Project';
import StudentProject from './StudentProject';
import Card from './Card';
import Lang from './Lang';

module.exports.getStatisticsByUser = async (userId)=>{
  let err, data;
  var stat= {
    value: 'ok',
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
    langCharCount: 0,
    langCharFreq: {}
  };

  let studentProjectsId = [];
  [err, data, studentProjectsId] = await StudentProject.getByUser(userId);

  stat['userStudentProjects'] = studentProjectsId;
  stat['studentProjects'] = data;

  let cardsId = [];
  [err, data, cardsId] = await Card.getByStudentProjects(stat['studentProjects']);

  stat['userCards'] = cardsId;
  stat['cards'] = data;

  let langsId = [];
  [err, data, langsId] = await Lang.getByCards(stat['cards']);

  stat['userLangs'] = langsId;
  stat['langs'] = data;

  let featuredLangsId = [];
  [err, data, langsId] = await Lang.getByCards(stat['cards'], true);

  stat['userFeaturedLangs'] = featuredLangsId;
  stat['featuredLangs'] = data;

  let projectsId = [];
  [err, data, projectsId] = await Project.getByStudentProjects(stat['studentProjects']);

  stat['userProjects'] = projectsId;
  stat['projects'] = data;

  let subjectsId = [];
  [err, data, subjectsId] = await Subject.getByProjects(stat['projects']);

  stat['userSubjects'] = subjectsId;
  stat['subjects'] = data;

  let coursesId = [];
  [err, data, coursesId] = await Course.getBySubjects(stat['subjects']);

  stat['userCourses'] = coursesId;
  stat['courses'] = data;

  for(var i=0;i<stat.cards.length;i++){
    if(stat.cards[i].grade === 'featured'){ stat.featuredCount++; }
  }

  for(var i=0;i<stat.featuredLangs.length;i++){
    const txt = stat.featuredLangs[i].text;
    const key = stat.featuredLangs[i].key;
    stat.langCharCount += txt.length;
    for(var j=0;j<txt.length;j++){
      if(!stat.langCharFreq[key]){ stat.langCharFreq[key] = {}; }
      if(!stat.langCharFreq[key][txt[j]]){ stat.langCharFreq[key][txt[j]] = 0; }
      stat.langCharFreq[key][txt[j]]++;
    }
    stat.langCharFreq[key] = sortNumuriObject(stat.langCharFreq[key]);
  }

  //console.log(stat);
  return [err, stat];
}

module.exports.getStatistics = async (schoolId)=>{
  let err, data, school;
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
    featured: 0
  };

  [err, school] = await to(School.findById(schoolId));
  let coursesId = [];
  [err, data, coursesId] = await Course.getBySchool(school);

  stat['schoolCourses'] = coursesId;
  stat['courses'] = data;

  let subjectsId = [];
  [err, data, subjectsId] = await Subject.getByCourses(data, true);

  stat['schoolSubjects'] = subjectsId;
  stat['subjects'] = data;

  let projectsId = [];
  [err, data, projectsId] = await Project.getBySubjects(data);

  stat['schoolProjects'] = projectsId;
  stat['projects'] = data;

  let cardsId = [];
  let featured = 0;
  [err, data, cardsId, featured] = await Card.getByProjects(data);

  stat['schoolCards'] = cardsId;
  stat['cards'] = data;
  stat['featured'] = featured;

  let langsId = [];
  [err, data, langsId] = await Lang.getByCards(data);

  stat['schoolLangs'] = langsId;
  stat['langs'] = data;

  let profilesId = [];
  [err, data, profilesId] = await Profile.getTeachers(schoolId);

  stat['schoolTeachers'] = profilesId;
  stat['profiles'] = data;

  [err, data, profilesId] = await Profile.getStudents(stat.schoolCourses);

  stat['schoolStudents'] = profilesId;
  stat['profiles'] = [...stat['profiles'], ...data];

  return [err, stat];
}

var sortNumuriObject = (objectToSort) =>{
  var sortable = [];
  for (var item in objectToSort){ sortable.push([item, objectToSort[item]]); }
  sortable.sort((a, b)=> { return b[1] - a[1]; });

  var objectToReturn = {};
  for (var i = 0;i<sortable.length;i++){  objectToReturn[sortable[i][0]] = sortable[i][1] }

  return objectToReturn;
}
