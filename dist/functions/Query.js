'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('../models/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _School = require('../models/School');

var _School2 = _interopRequireDefault(_School);

var _Course = require('../models/Course');

var _Course2 = _interopRequireDefault(_Course);

var _Subject = require('../models/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Project = require('../models/Project');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../models/StudentProject');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Card = require('../models/Card');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../models/Lang');

var _Lang2 = _interopRequireDefault(_Lang);

var _Log = require('../models/Log');

var _Log2 = _interopRequireDefault(_Log);

var _Publish = require('../models/survey/Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _Submit = require('../models/survey/Submit');

var _Submit2 = _interopRequireDefault(_Submit);

var _Question = require('../models/survey/Question');

var _Question2 = _interopRequireDefault(_Question);

var _Answer = require('../models/survey/Answer');

var _Answer2 = _interopRequireDefault(_Answer);

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports.getStatisticsByPublish = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(publishId) {
    var err, answer, question, stat, submits, _ref2, _ref3, answers, i, _ref4, _ref5, options, j, _ref6, _ref7;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stat = {
              submits: [],
              answers: [],

              answerOptionGraphData: {}
            };
            submits = [];
            _context.next = 4;
            return (0, _to2.default)(_Submit2.default.find({ publish: publishId }));

          case 4:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            submits = _ref3[1];

            stat['submits'] = submits;

            answers = [];
            i = 0;

          case 11:
            if (!(i < submits.length)) {
              _context.next = 22;
              break;
            }

            _context.next = 14;
            return (0, _to2.default)(_Answer2.default.find({ _id: { $in: submits[i].answers } }));

          case 14:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            answer = _ref5[1];

            answers = [].concat(_toConsumableArray(answers), _toConsumableArray(answer));

          case 19:
            i++;
            _context.next = 11;
            break;

          case 22:
            stat['answers'] = answers;

            options = {};
            j = 0;

          case 25:
            if (!(j < answers.length)) {
              _context.next = 36;
              break;
            }

            _context.next = 28;
            return (0, _to2.default)(_Question2.default.findOne({ _id: answers[j].question }));

          case 28:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            err = _ref7[0];
            question = _ref7[1];

            if (!options[question._id] && question.type === 'option') {
              options[question._id] = question.options;
            }

          case 33:
            j++;
            _context.next = 25;
            break;

          case 36:

            stat['answerOptionGraphData'] = _Graph2.default.answerOption(stat['answers'], options);

            return _context.abrupt('return', [err, stat]);

          case 38:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getStatisticsByUser = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId) {
    var err, data, stat, studentProjectsId, _ref9, _ref10, cardsId, _ref11, _ref12, langsId, _ref13, _ref14, featuredLangsId, _ref15, _ref16, projectsId, _ref17, _ref18, subjectsId, _ref19, _ref20, coursesId, _ref21, _ref22, i, langCharStat;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stat = {
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
            studentProjectsId = [];
            _context2.next = 4;
            return _StudentProject2.default.getByUser(userId);

          case 4:
            _ref9 = _context2.sent;
            _ref10 = _slicedToArray(_ref9, 3);
            err = _ref10[0];
            data = _ref10[1];
            studentProjectsId = _ref10[2];


            stat['userStudentProjects'] = studentProjectsId;
            stat['studentProjects'] = data;

            cardsId = [];
            _context2.next = 14;
            return _Card2.default.getByStudentProjects(stat['studentProjects']);

          case 14:
            _ref11 = _context2.sent;
            _ref12 = _slicedToArray(_ref11, 3);
            err = _ref12[0];
            data = _ref12[1];
            cardsId = _ref12[2];


            stat['userCards'] = cardsId;
            stat['cards'] = data;

            langsId = [];
            _context2.next = 24;
            return _Lang2.default.getByCards(stat['cards']);

          case 24:
            _ref13 = _context2.sent;
            _ref14 = _slicedToArray(_ref13, 3);
            err = _ref14[0];
            data = _ref14[1];
            langsId = _ref14[2];


            stat['userLangs'] = langsId;
            stat['langs'] = data;

            featuredLangsId = [];
            _context2.next = 34;
            return _Lang2.default.getByCards(stat['cards'], true);

          case 34:
            _ref15 = _context2.sent;
            _ref16 = _slicedToArray(_ref15, 3);
            err = _ref16[0];
            data = _ref16[1];
            featuredLangsId = _ref16[2];


            stat['userFeaturedLangs'] = featuredLangsId;
            stat['featuredLangs'] = data;

            projectsId = [];
            _context2.next = 44;
            return _Project2.default.getByStudentProjects(stat['studentProjects']);

          case 44:
            _ref17 = _context2.sent;
            _ref18 = _slicedToArray(_ref17, 3);
            err = _ref18[0];
            data = _ref18[1];
            projectsId = _ref18[2];


            stat['userProjects'] = projectsId;
            stat['projects'] = data;

            subjectsId = [];
            _context2.next = 54;
            return _Subject2.default.getByProjects(stat['projects']);

          case 54:
            _ref19 = _context2.sent;
            _ref20 = _slicedToArray(_ref19, 3);
            err = _ref20[0];
            data = _ref20[1];
            subjectsId = _ref20[2];


            stat['userSubjects'] = subjectsId;
            stat['subjects'] = data;

            coursesId = [];
            _context2.next = 64;
            return _Course2.default.getBySubjects(stat['subjects']);

          case 64:
            _ref21 = _context2.sent;
            _ref22 = _slicedToArray(_ref21, 3);
            err = _ref22[0];
            data = _ref22[1];
            coursesId = _ref22[2];


            stat['userCourses'] = coursesId;
            stat['courses'] = data;

            for (i = 0; i < stat.cards.length; i++) {
              if (stat.cards[i].grade === 'featured') {
                stat.featuredCount++;
                if (stat.cards[i].likeCount) {
                  stat.likeCount += stat.cards[i].likeCount;
                }
              }
            }

            langCharStat = mostlyUsedCharInLangs(stat.langs);

            stat['langCharFreq'] = langCharStat.langCharFreq;
            stat['langCharCount'] = langCharStat.langCharCount;

            stat['cardDateGraphData'] = _Graph2.default.cardDate(stat['cards']);
            stat['cardMonthGraphData'] = _Graph2.default.cardMonth(stat['cards']);

            //console.log(stat);
            return _context2.abrupt('return', [err, stat]);

          case 78:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref8.apply(this, arguments);
  };
}();

module.exports.getStatisticsByCourse = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(courseId) {
    var err, data, course, stat, _ref24, _ref25, profilesId, _ref26, _ref27, _ref28, _ref29, projectsId, _ref30, _ref31, studentProjectsId, _ref32, _ref33, cardsId, featured, _ref34, _ref35, langsId, _ref36, _ref37;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            stat = {
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
            _context3.next = 3;
            return (0, _to2.default)(_Course2.default.findById(courseId));

          case 3:
            _ref24 = _context3.sent;
            _ref25 = _slicedToArray(_ref24, 2);
            err = _ref25[0];
            course = _ref25[1];

            stat['course'] = course;

            profilesId = [];
            _context3.next = 11;
            return _Profile2.default.getStudentsByCoursesId([courseId]);

          case 11:
            _ref26 = _context3.sent;
            _ref27 = _slicedToArray(_ref26, 3);
            err = _ref27[0];
            data = _ref27[1];
            profilesId = _ref27[2];


            stat['courseStudents'] = profilesId;
            stat['profiles'] = [].concat(_toConsumableArray(stat['profiles']), _toConsumableArray(data));

            _context3.next = 20;
            return (0, _to2.default)(_Subject2.default.find({ _id: { $in: course.subjects } }));

          case 20:
            _ref28 = _context3.sent;
            _ref29 = _slicedToArray(_ref28, 2);
            err = _ref29[0];
            data = _ref29[1];

            stat['subjects'] = data;

            projectsId = [];
            _context3.next = 28;
            return _Project2.default.getBySubjects(data);

          case 28:
            _ref30 = _context3.sent;
            _ref31 = _slicedToArray(_ref30, 3);
            err = _ref31[0];
            data = _ref31[1];
            projectsId = _ref31[2];


            stat['courseProjects'] = projectsId;
            stat['projects'] = data;

            studentProjectsId = [];
            _context3.next = 38;
            return _StudentProject2.default.getByProjects(data);

          case 38:
            _ref32 = _context3.sent;
            _ref33 = _slicedToArray(_ref32, 3);
            err = _ref33[0];
            data = _ref33[1];
            studentProjectsId = _ref33[2];


            stat['courseStudentProjects'] = studentProjectsId;
            stat['studentProjects'] = data;

            cardsId = [];
            featured = 0;
            _context3.next = 49;
            return _Card2.default.getByStudentProjects(stat['studentProjects']);

          case 49:
            _ref34 = _context3.sent;
            _ref35 = _slicedToArray(_ref34, 4);
            err = _ref35[0];
            data = _ref35[1];
            cardsId = _ref35[2];
            featured = _ref35[3];


            stat['courseCards'] = cardsId;
            stat['cards'] = data;
            stat['featuredCount'] = featured;

            langsId = [];
            _context3.next = 61;
            return _Lang2.default.getByCards(stat['cards']);

          case 61:
            _ref36 = _context3.sent;
            _ref37 = _slicedToArray(_ref36, 3);
            err = _ref37[0];
            data = _ref37[1];
            langsId = _ref37[2];


            stat['courseLangs'] = langsId;
            stat['langs'] = data;

            stat['cardDateGraphData'] = _Graph2.default.cardDate(stat['cards']);
            stat['cardMonthGraphData'] = _Graph2.default.cardMonth(stat['cards']);
            stat['cardStudentGraphData'] = _Graph2.default.cardStudent(stat['cards'], course.teacher);

            //console.log(stat);
            return _context3.abrupt('return', [err, stat]);

          case 72:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref23.apply(this, arguments);
  };
}();

module.exports.getStatisticsBySchool = function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(schoolId) {
    var err, data, school, stat, _ref39, _ref40, coursesId, _ref41, _ref42, subjectsId, _ref43, _ref44, projectsId, _ref45, _ref46, cardsId, featuredCount, _ref47, _ref48, langsId, _ref49, _ref50, profilesId, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            stat = {
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
            _context4.next = 3;
            return (0, _to2.default)(_School2.default.findById(schoolId));

          case 3:
            _ref39 = _context4.sent;
            _ref40 = _slicedToArray(_ref39, 2);
            err = _ref40[0];
            school = _ref40[1];
            coursesId = [];
            _context4.next = 10;
            return _Course2.default.getBySchool(school);

          case 10:
            _ref41 = _context4.sent;
            _ref42 = _slicedToArray(_ref41, 3);
            err = _ref42[0];
            data = _ref42[1];
            coursesId = _ref42[2];


            stat['schoolCourses'] = coursesId;
            stat['courses'] = data;

            subjectsId = [];
            _context4.next = 20;
            return _Subject2.default.getByCourses(data, true);

          case 20:
            _ref43 = _context4.sent;
            _ref44 = _slicedToArray(_ref43, 3);
            err = _ref44[0];
            data = _ref44[1];
            subjectsId = _ref44[2];


            stat['schoolSubjects'] = subjectsId;
            stat['subjects'] = data;

            projectsId = [];
            _context4.next = 30;
            return _Project2.default.getBySubjects(data);

          case 30:
            _ref45 = _context4.sent;
            _ref46 = _slicedToArray(_ref45, 3);
            err = _ref46[0];
            data = _ref46[1];
            projectsId = _ref46[2];


            stat['schoolProjects'] = projectsId;
            stat['projects'] = data;

            cardsId = [];
            featuredCount = 0;
            _context4.next = 41;
            return _Card2.default.getByProjects(data);

          case 41:
            _ref47 = _context4.sent;
            _ref48 = _slicedToArray(_ref47, 4);
            err = _ref48[0];
            data = _ref48[1];
            cardsId = _ref48[2];
            featuredCount = _ref48[3];


            stat['schoolCards'] = cardsId;
            stat['cards'] = data;
            stat['featuredCount'] = featuredCount;

            langsId = [];
            _context4.next = 53;
            return _Lang2.default.getByCards(data);

          case 53:
            _ref49 = _context4.sent;
            _ref50 = _slicedToArray(_ref49, 3);
            err = _ref50[0];
            data = _ref50[1];
            langsId = _ref50[2];


            stat['schoolLangs'] = langsId;
            stat['langs'] = data;

            profilesId = [];
            _context4.next = 63;
            return _Profile2.default.getTeachersBySchool(schoolId);

          case 63:
            _ref51 = _context4.sent;
            _ref52 = _slicedToArray(_ref51, 3);
            err = _ref52[0];
            data = _ref52[1];
            profilesId = _ref52[2];


            stat['schoolTeachers'] = profilesId;
            stat['profiles'] = data;

            _context4.next = 72;
            return _Profile2.default.getStudentsByCoursesId(stat.schoolCourses);

          case 72:
            _ref53 = _context4.sent;
            _ref54 = _slicedToArray(_ref53, 3);
            err = _ref54[0];
            data = _ref54[1];
            profilesId = _ref54[2];


            stat['schoolStudents'] = profilesId;
            stat['profiles'] = [].concat(_toConsumableArray(stat.profiles), _toConsumableArray(data));

            stat['cardDateGraphData'] = _Graph2.default.cardDate(stat['cards']);
            stat['cardMonthGraphData'] = _Graph2.default.cardMonth(stat['cards']);

            _context4.next = 83;
            return _Log2.default.getMultipleByProfiles(stat.profiles);

          case 83:
            _ref55 = _context4.sent;
            _ref56 = _slicedToArray(_ref55, 2);
            err = _ref56[0];
            data = _ref56[1];


            stat['loginDateGraphData'] = _Graph2.default.loginDate(data);

            return _context4.abrupt('return', [err, stat]);

          case 89:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref38.apply(this, arguments);
  };
}();

var mostlyUsedCharInLangs = function mostlyUsedCharInLangs(langs) {
  var stat = { langCharFreq: {}, langCharCount: 0 };
  var skipChar = ['，', '。', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  for (var i = 0; i < langs.length; i++) {
    var txt = langs[i].text;
    var key = langs[i].key;

    stat.langCharCount += txt.length;
    for (var j = 0; j < txt.length; j++) {
      if (skipChar.indexOf(txt[j]) > -1) {
        continue;
      }
      if (!stat.langCharFreq[key]) {
        stat.langCharFreq[key] = {};
      }
      if (!stat.langCharFreq[key][txt[j]]) {
        stat.langCharFreq[key][txt[j]] = 0;
      }
      stat.langCharFreq[key][txt[j]]++;
    }
    stat.langCharFreq[key] = sortNumuriObject(stat.langCharFreq[key]);
  }
  //console.log(stat);
  return stat;
};

var sortNumuriObject = function sortNumuriObject(objectToSort) {
  var sortable = [];
  for (var item in objectToSort) {
    sortable.push([item, objectToSort[item]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  var objectToReturn = {};
  for (var i = 0; i < sortable.length; i++) {
    objectToReturn[sortable[i][0]] = sortable[i][1];
  }

  return objectToReturn;
};
//# sourceMappingURL=Query.js.map