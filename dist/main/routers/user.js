'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router2 = require('./Router');

var _Router3 = _interopRequireDefault(_Router2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _User = require('../../models/User.js');

var _User2 = _interopRequireDefault(_User);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _Course = require('../../models/Course.js');

var _Course2 = _interopRequireDefault(_Course);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;

var UserRouter = function (_Router) {
  _inherits(UserRouter, _Router);

  function UserRouter(app) {
    _classCallCheck(this, UserRouter);

    var _this = _possibleConstructorReturn(this, (UserRouter.__proto__ || Object.getPrototypeOf(UserRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(UserRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/mlang');
      var db = _mongoose2.default.connection;

      app.post('/user/update', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var data, err, existedUser, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  err = void 0, existedUser = void 0;
                  _context.next = 4;
                  return (0, _to2.default)(_User2.default.findOne({ id: data.id, pw: data.pw }));

                case 4:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  existedUser = _ref3[1];

                  if (!err) {
                    _context.next = 11;
                    break;
                  }

                  console.log(err);return _context.abrupt('return', res.json({ result: 'failed' }));

                case 11:
                  if (!(existedUser && existedUser._id.toString() !== data._id)) {
                    _context.next = 14;
                    break;
                  }

                  console.log('user id/pw already used');return _context.abrupt('return', res.json({ result: 'failed' }));

                case 14:

                  _User2.default.findOneAndUpdate({ _id: data._id }, { $set: {
                      type: data.type,
                      id: data.id,
                      pw: data.pw,
                      email: data.email
                    } }, { new: true }, function (err, updatedUser) {
                    //console.log(_updatedUser)
                    return res.json({
                      result: err || !updatedUser ? 'failed' : 'success',
                      updatedUser: updatedUser
                    });
                  });

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());

      app.get('/user/resetPassword/', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var email;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  email = req.headers.email;


                  _User2.default.resetPassword(email, function (result) {
                    return res.json({ result: result });
                  });

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.get('/user/getNewAccount/', function (req, res, next) {
        var email = req.headers.email;

        _User2.default.acquireNewAccount(email, function (result) {
          return res.json({ result: result });
        });
      });

      app.get('/user/login/', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var id, pw, err, user, profile, othersProfile, course, project, studentProject, profiles, _ref6, _ref7, _ref8, _ref9, courses, projects, joinedCourses, joinedProjects, today, i, _ref10, _ref11, endDate, _ref12, _ref13, studentProjects, j, _ref14, _ref15, _ref16, _ref17, teachingCourses, teachingProjects, teachingCoursesData, _ref18, _ref19, _ref20, _ref21, k, _endDate, l, _ref22, _ref23;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  id = req.headers.id;
                  pw = req.headers.pw;
                  err = void 0, user = void 0, profile = void 0, othersProfile = void 0, course = void 0, project = void 0, studentProject = void 0;
                  profiles = [];
                  _context3.next = 6;
                  return (0, _to2.default)(_User2.default.findOne({ id: id, pw: pw }));

                case 6:
                  _ref6 = _context3.sent;
                  _ref7 = _slicedToArray(_ref6, 2);
                  err = _ref7[0];
                  user = _ref7[1];

                  if (!(err || !user)) {
                    _context3.next = 14;
                    break;
                  }

                  console.log(err);console.log(user);return _context3.abrupt('return', res.json({ result: "failed" }));

                case 14:
                  _context3.next = 16;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: user._id }));

                case 16:
                  _ref8 = _context3.sent;
                  _ref9 = _slicedToArray(_ref8, 2);
                  err = _ref9[0];
                  profile = _ref9[1];

                  if (!(err || profile === null)) {
                    _context3.next = 22;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 22:
                  profiles.push(profile);

                  courses = [];
                  projects = [];
                  joinedCourses = profile.joinedCourses;
                  joinedProjects = [];
                  today = new Date();
                  i = 0;

                case 29:
                  if (!(i < joinedCourses.length)) {
                    _context3.next = 53;
                    break;
                  }

                  _context3.next = 32;
                  return (0, _to2.default)(_Course2.default.findById(joinedCourses[i]));

                case 32:
                  _ref10 = _context3.sent;
                  _ref11 = _slicedToArray(_ref10, 2);
                  err = _ref11[0];
                  course = _ref11[1];

                  if (!(err || course === null)) {
                    _context3.next = 38;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 38:
                  endDate = new Date(course.endDate);
                  /*if(endDate < today){
                    joinedCourses.splice(i, 1);
                    i--;
                    continue;
                  }*/

                  courses.push(course);
                  joinedProjects = [].concat(_toConsumableArray(joinedProjects), _toConsumableArray(course.projects));

                  _context3.next = 43;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: course.teacher }));

                case 43:
                  _ref12 = _context3.sent;
                  _ref13 = _slicedToArray(_ref12, 2);
                  err = _ref13[0];
                  othersProfile = _ref13[1];

                  if (!(err || othersProfile === null)) {
                    _context3.next = 49;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 49:
                  profiles.push(othersProfile);

                case 50:
                  i++;
                  _context3.next = 29;
                  break;

                case 53:
                  studentProjects = [];
                  j = 0;

                case 55:
                  if (!(j < joinedProjects.length)) {
                    _context3.next = 75;
                    break;
                  }

                  _context3.next = 58;
                  return (0, _to2.default)(_Project2.default.findById(joinedProjects[j]));

                case 58:
                  _ref14 = _context3.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  project = _ref15[1];

                  if (!(err || project === null)) {
                    _context3.next = 64;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 64:
                  projects.push(project);

                  _context3.next = 67;
                  return (0, _to2.default)(_StudentProject2.default.findOne({ project: project._id, student: user._id }));

                case 67:
                  _ref16 = _context3.sent;
                  _ref17 = _slicedToArray(_ref16, 2);
                  err = _ref17[0];
                  studentProject = _ref17[1];

                  if (studentProject) {
                    studentProjects.push(studentProject);
                  }

                case 72:
                  j++;
                  _context3.next = 55;
                  break;

                case 75:
                  teachingCourses = [];
                  teachingProjects = [];
                  teachingCoursesData = [];
                  _context3.next = 80;
                  return (0, _to2.default)(_Course2.default.find({ teacher: user._id }));

                case 80:
                  _ref18 = _context3.sent;
                  _ref19 = _slicedToArray(_ref18, 2);
                  err = _ref19[0];
                  teachingCoursesData = _ref19[1];

                  if (!err) {
                    _context3.next = 86;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 86:
                  courses = [].concat(_toConsumableArray(courses), _toConsumableArray(teachingCoursesData));

                  i = 0;

                case 88:
                  if (!(i < teachingCoursesData.length)) {
                    _context3.next = 102;
                    break;
                  }

                  /*const endDate = new Date(teachingCoursesData[i].endDate);
                  if(endDate < today){
                    return;
                  }*/
                  teachingCourses.push(teachingCoursesData[i]._id);

                  _context3.next = 92;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: teachingCoursesData[i].teacher }));

                case 92:
                  _ref20 = _context3.sent;
                  _ref21 = _slicedToArray(_ref20, 2);
                  err = _ref21[0];
                  othersProfile = _ref21[1];

                  if (!(err || othersProfile === null)) {
                    _context3.next = 98;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 98:
                  profiles.push(othersProfile);

                case 99:
                  i++;
                  _context3.next = 88;
                  break;

                case 102:

                  for (k = 0; k < teachingCoursesData.length; k++) {
                    _endDate = new Date(teachingCoursesData[k].endDate);
                    /*if(endDate < today){
                      continue;
                    }*/

                    teachingProjects = [].concat(_toConsumableArray(teachingProjects), _toConsumableArray(teachingCoursesData[k].projects));
                  }

                  l = 0;

                case 104:
                  if (!(l < teachingProjects.length)) {
                    _context3.next = 117;
                    break;
                  }

                  _context3.next = 107;
                  return (0, _to2.default)(_Project2.default.findById(teachingProjects[l]));

                case 107:
                  _ref22 = _context3.sent;
                  _ref23 = _slicedToArray(_ref22, 2);
                  err = _ref23[0];
                  project = _ref23[1];

                  if (!(err || project === null)) {
                    _context3.next = 113;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 113:
                  projects.push(project);

                case 114:
                  l++;
                  _context3.next = 104;
                  break;

                case 117:
                  return _context3.abrupt('return', res.json({
                    result: "success",
                    user: user,
                    profile: profile,
                    profiles: profiles,

                    teachingCourses: teachingCourses,
                    joinedCourses: joinedCourses,

                    teachingProjects: teachingProjects,
                    joinedProjects: joinedProjects,

                    studentProjects: studentProjects,

                    courses: courses,
                    projects: projects
                  }));

                case 118:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x7, _x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }]);

  return UserRouter;
}(_Router3.default);

exports.default = UserRouter;
//# sourceMappingURL=user.js.map