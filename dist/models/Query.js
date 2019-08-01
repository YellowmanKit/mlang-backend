'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _School = require('./School');

var _School2 = _interopRequireDefault(_School);

var _Course = require('./Course');

var _Course2 = _interopRequireDefault(_Course);

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('./StudentProject');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('./Lang');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports.getStatisticsByUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var err, data, stat, studentProjectsId, _ref2, _ref3, cardsId, _ref4, _ref5, langsId, _ref6, _ref7, featuredLangsId, _ref8, _ref9, projectsId, _ref10, _ref11, subjectsId, _ref12, _ref13, coursesId, _ref14, _ref15, i, txt, key, j;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, data = void 0;
            stat = {
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
            studentProjectsId = [];
            _context.next = 5;
            return _StudentProject2.default.getByUser(userId);

          case 5:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 3);
            err = _ref3[0];
            data = _ref3[1];
            studentProjectsId = _ref3[2];


            stat['userStudentProjects'] = studentProjectsId;
            stat['studentProjects'] = data;

            cardsId = [];
            _context.next = 15;
            return _Card2.default.getByStudentProjects(stat['studentProjects']);

          case 15:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 3);
            err = _ref5[0];
            data = _ref5[1];
            cardsId = _ref5[2];


            stat['userCards'] = cardsId;
            stat['cards'] = data;

            langsId = [];
            _context.next = 25;
            return _Lang2.default.getByCards(stat['cards']);

          case 25:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 3);
            err = _ref7[0];
            data = _ref7[1];
            langsId = _ref7[2];


            stat['userLangs'] = langsId;
            stat['langs'] = data;

            featuredLangsId = [];
            _context.next = 35;
            return _Lang2.default.getByCards(stat['cards'], true);

          case 35:
            _ref8 = _context.sent;
            _ref9 = _slicedToArray(_ref8, 3);
            err = _ref9[0];
            data = _ref9[1];
            langsId = _ref9[2];


            stat['userFeaturedLangs'] = featuredLangsId;
            stat['featuredLangs'] = data;

            projectsId = [];
            _context.next = 45;
            return _Project2.default.getByStudentProjects(stat['studentProjects']);

          case 45:
            _ref10 = _context.sent;
            _ref11 = _slicedToArray(_ref10, 3);
            err = _ref11[0];
            data = _ref11[1];
            projectsId = _ref11[2];


            stat['userProjects'] = projectsId;
            stat['projects'] = data;

            subjectsId = [];
            _context.next = 55;
            return _Subject2.default.getByProjects(stat['projects']);

          case 55:
            _ref12 = _context.sent;
            _ref13 = _slicedToArray(_ref12, 3);
            err = _ref13[0];
            data = _ref13[1];
            subjectsId = _ref13[2];


            stat['userSubjects'] = subjectsId;
            stat['subjects'] = data;

            coursesId = [];
            _context.next = 65;
            return _Course2.default.getBySubjects(stat['subjects']);

          case 65:
            _ref14 = _context.sent;
            _ref15 = _slicedToArray(_ref14, 3);
            err = _ref15[0];
            data = _ref15[1];
            coursesId = _ref15[2];


            stat['userCourses'] = coursesId;
            stat['courses'] = data;

            for (i = 0; i < stat.cards.length; i++) {
              if (stat.cards[i].grade === 'featured') {
                stat.featuredCount++;
              }
            }

            for (i = 0; i < stat.featuredLangs.length; i++) {
              txt = stat.featuredLangs[i].text;
              key = stat.featuredLangs[i].key;

              stat.langCharCount += txt.length;
              for (j = 0; j < txt.length; j++) {
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
            return _context.abrupt('return', [err, stat]);

          case 75:
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

module.exports.getStatistics = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(schoolId) {
    var err, data, school, stat, _ref17, _ref18, coursesId, _ref19, _ref20, subjectsId, _ref21, _ref22, projectsId, _ref23, _ref24, cardsId, featured, _ref25, _ref26, langsId, _ref27, _ref28, profilesId, _ref29, _ref30, _ref31, _ref32;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, data = void 0, school = void 0;
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
              featured: 0
            };
            _context2.next = 4;
            return (0, _to2.default)(_School2.default.findById(schoolId));

          case 4:
            _ref17 = _context2.sent;
            _ref18 = _slicedToArray(_ref17, 2);
            err = _ref18[0];
            school = _ref18[1];
            coursesId = [];
            _context2.next = 11;
            return _Course2.default.getBySchool(school);

          case 11:
            _ref19 = _context2.sent;
            _ref20 = _slicedToArray(_ref19, 3);
            err = _ref20[0];
            data = _ref20[1];
            coursesId = _ref20[2];


            stat['schoolCourses'] = coursesId;
            stat['courses'] = data;

            subjectsId = [];
            _context2.next = 21;
            return _Subject2.default.getByCourses(data, true);

          case 21:
            _ref21 = _context2.sent;
            _ref22 = _slicedToArray(_ref21, 3);
            err = _ref22[0];
            data = _ref22[1];
            subjectsId = _ref22[2];


            stat['schoolSubjects'] = subjectsId;
            stat['subjects'] = data;

            projectsId = [];
            _context2.next = 31;
            return _Project2.default.getBySubjects(data);

          case 31:
            _ref23 = _context2.sent;
            _ref24 = _slicedToArray(_ref23, 3);
            err = _ref24[0];
            data = _ref24[1];
            projectsId = _ref24[2];


            stat['schoolProjects'] = projectsId;
            stat['projects'] = data;

            cardsId = [];
            featured = 0;
            _context2.next = 42;
            return _Card2.default.getByProjects(data);

          case 42:
            _ref25 = _context2.sent;
            _ref26 = _slicedToArray(_ref25, 4);
            err = _ref26[0];
            data = _ref26[1];
            cardsId = _ref26[2];
            featured = _ref26[3];


            stat['schoolCards'] = cardsId;
            stat['cards'] = data;
            stat['featured'] = featured;

            langsId = [];
            _context2.next = 54;
            return _Lang2.default.getByCards(data);

          case 54:
            _ref27 = _context2.sent;
            _ref28 = _slicedToArray(_ref27, 3);
            err = _ref28[0];
            data = _ref28[1];
            langsId = _ref28[2];


            stat['schoolLangs'] = langsId;
            stat['langs'] = data;

            profilesId = [];
            _context2.next = 64;
            return _Profile2.default.getTeachers(schoolId);

          case 64:
            _ref29 = _context2.sent;
            _ref30 = _slicedToArray(_ref29, 3);
            err = _ref30[0];
            data = _ref30[1];
            profilesId = _ref30[2];


            stat['schoolTeachers'] = profilesId;
            stat['profiles'] = data;

            _context2.next = 73;
            return _Profile2.default.getStudents(stat.schoolCourses);

          case 73:
            _ref31 = _context2.sent;
            _ref32 = _slicedToArray(_ref31, 3);
            err = _ref32[0];
            data = _ref32[1];
            profilesId = _ref32[2];


            stat['schoolStudents'] = profilesId;
            stat['profiles'] = [].concat(_toConsumableArray(stat['profiles']), _toConsumableArray(data));

            return _context2.abrupt('return', [err, stat]);

          case 81:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref16.apply(this, arguments);
  };
}();

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