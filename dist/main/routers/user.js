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

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Query = require('../../functions/Query.js');

var _Query2 = _interopRequireDefault(_Query);

var _User = require('../../models/User.js');

var _User2 = _interopRequireDefault(_User);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _School = require('../../models/School.js');

var _School2 = _interopRequireDefault(_School);

var _Course = require('../../models/Course.js');

var _Course2 = _interopRequireDefault(_Course);

var _Subject = require('../../models/Subject.js');

var _Subject2 = _interopRequireDefault(_Subject);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Group = require('../../models/Group.js');

var _Group2 = _interopRequireDefault(_Group);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

var _Questionnaire = require('../../models/survey/Questionnaire.js');

var _Questionnaire2 = _interopRequireDefault(_Questionnaire);

var _Question = require('../../models/survey/Question.js');

var _Question2 = _interopRequireDefault(_Question);

var _Publish = require('../../models/survey/Publish.js');

var _Publish2 = _interopRequireDefault(_Publish);

var _Submit = require('../../models/survey/Submit.js');

var _Submit2 = _interopRequireDefault(_Submit);

var _Answer = require('../../models/survey/Answer.js');

var _Answer2 = _interopRequireDefault(_Answer);

var _Log = require('../../models/Log.js');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserRouter = function (_Router) {
      _inherits(UserRouter, _Router);

      function UserRouter(app, mlanghku) {
            _classCallCheck(this, UserRouter);

            var _this = _possibleConstructorReturn(this, (UserRouter.__proto__ || Object.getPrototypeOf(UserRouter)).call(this, app));

            _this.app = app;
            _this.mlanghku = mlanghku;
            _this.init();
            return _this;
      }

      _createClass(UserRouter, [{
            key: 'init',
            value: function init() {
                  var _this2 = this;

                  var app = this.app;
                  var mlanghku = this.mlanghku;

                  app.post('/user/addAdmin', function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
                              var userId, err, updatedUser, _ref2, _ref3, profiles, admins, _ref4, _ref5;

                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                          switch (_context.prev = _context.next) {
                                                case 0:
                                                      userId = req.body.data.userId;
                                                      //console.log(userId);

                                                      _context.next = 3;
                                                      return (0, _to2.default)(_User2.default.findOneAndUpdate({ id: userId }, { $set: { type: 'admin' } }, { new: true }));

                                                case 3:
                                                      _ref2 = _context.sent;
                                                      _ref3 = _slicedToArray(_ref2, 2);
                                                      err = _ref3[0];
                                                      updatedUser = _ref3[1];

                                                      if (!err) {
                                                            _context.next = 10;
                                                            break;
                                                      }

                                                      console.log(err);return _context.abrupt('return', res.json({ result: 'failed' }));

                                                case 10:
                                                      profiles = [];
                                                      admins = [];
                                                      _context.next = 14;
                                                      return _User2.default.getProfilesByUsers([updatedUser]);

                                                case 14:
                                                      _ref4 = _context.sent;
                                                      _ref5 = _slicedToArray(_ref4, 3);
                                                      err = _ref5[0];
                                                      profiles = _ref5[1];
                                                      admins = _ref5[2];

                                                      if (!err) {
                                                            _context.next = 22;
                                                            break;
                                                      }

                                                      console.log(err);return _context.abrupt('return', res.json({ result: 'failed' }));

                                                case 22:
                                                      return _context.abrupt('return', res.json({
                                                            result: 'success',
                                                            updatedUser: updatedUser,
                                                            profiles: profiles,
                                                            admins: admins
                                                      }));

                                                case 23:
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

                  app.post('/user/update', function () {
                        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
                              var data, err, existedUser, _ref7, _ref8;

                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                          switch (_context2.prev = _context2.next) {
                                                case 0:
                                                      data = req.body.data;
                                                      _context2.next = 3;
                                                      return (0, _to2.default)(_User2.default.findOne({ id: data.id, pw: data.pw }));

                                                case 3:
                                                      _ref7 = _context2.sent;
                                                      _ref8 = _slicedToArray(_ref7, 2);
                                                      err = _ref8[0];
                                                      existedUser = _ref8[1];

                                                      if (!err) {
                                                            _context2.next = 10;
                                                            break;
                                                      }

                                                      console.log(err);return _context2.abrupt('return', res.json({ result: 'failed' }));

                                                case 10:
                                                      if (!(existedUser && existedUser._id.toString() !== data._id)) {
                                                            _context2.next = 13;
                                                            break;
                                                      }

                                                      console.log('user id/pw already used');return _context2.abrupt('return', res.json({ result: 'failed' }));

                                                case 13:

                                                      _User2.default.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true }, function (err, updatedUser) {
                                                            return res.json({
                                                                  result: err || !updatedUser ? 'failed' : 'success',
                                                                  updatedUser: updatedUser
                                                            });
                                                      });

                                                case 14:
                                                case 'end':
                                                      return _context2.stop();
                                          }
                                    }
                              }, _callee2, _this2);
                        }));

                        return function (_x4, _x5, _x6) {
                              return _ref6.apply(this, arguments);
                        };
                  }());

                  app.get('/user/resetPassword/', function () {
                        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
                              var email;
                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                          switch (_context3.prev = _context3.next) {
                                                case 0:
                                                      email = req.headers.email;


                                                      _User2.default.resetPassword(email, function (result) {
                                                            return res.json({ result: result });
                                                      });

                                                case 2:
                                                case 'end':
                                                      return _context3.stop();
                                          }
                                    }
                              }, _callee3, _this2);
                        }));

                        return function (_x7, _x8, _x9) {
                              return _ref9.apply(this, arguments);
                        };
                  }());

                  app.get('/user/getNewAccountByCode/', function () {
                        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
                              var code, codeType, err, user, _ref11, _ref12;

                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                          switch (_context4.prev = _context4.next) {
                                                case 0:
                                                      code = req.headers.code;
                                                      codeType = req.headers.type;
                                                      _context4.next = 4;
                                                      return _User2.default.acquireNewAccountByCode(code, codeType);

                                                case 4:
                                                      _ref11 = _context4.sent;
                                                      _ref12 = _slicedToArray(_ref11, 2);
                                                      err = _ref12[0];
                                                      user = _ref12[1];

                                                      if (!err) {
                                                            _context4.next = 10;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: 'failed' }));

                                                case 10:
                                                      return _context4.abrupt('return', res.json({ result: 'success', id: user.id, pw: user.pw }));

                                                case 11:
                                                case 'end':
                                                      return _context4.stop();
                                          }
                                    }
                              }, _callee4, _this2);
                        }));

                        return function (_x10, _x11, _x12) {
                              return _ref10.apply(this, arguments);
                        };
                  }());

                  app.get('/user/getNewAccount/', function (req, res, next) {
                        var email = req.headers.email;

                        _User2.default.acquireNewAccount(email, function (result) {
                              return res.json({ result: result });
                        });
                  });

                  app.get('/user/login/', function () {
                        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
                              var id, pw, err, data, user, profile, appUser, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, profiles, schools, courses, subjects, projects, studentProjects, groups, cards, langs, questionnaires, questions, publishes, submits, answers, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, teacherProfiles, _ref30, _ref31, joinedSubjects, _ref32, _ref33, joinedProjects, _ref34, _ref35, joinedStudentProjects, _ref36, _ref37, joinedCards, _ref38, _ref39, joinedGroups, _ref40, _ref41, teachingCourses, _ref42, _ref43, teachingSubjects, _ref44, _ref45, teachingProjects, _ref46, _ref47, teachingStudentProjects, _ref48, _ref49, teachingCards, _ref50, _ref51, teachingGroups, _ref52, _ref53, supervisingSchools, _ref54, _ref55, adminUsers, _ref56, _ref57, admins, _ref58, _ref59, profilesId, _ref60, _ref61, langsId, _ref62, _ref63, createdQuestionnaires, _ref64, _ref65, assignedPublishes, _ref66, _ref67, createdSubmits, _ref68, _ref69, _ref70, _ref71, _ref72, _ref73, _ref74, _ref75, createdPublishes, _ref76, _ref77, _ref78, _ref79;

                              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                          switch (_context5.prev = _context5.next) {
                                                case 0:
                                                      id = req.headers.id;
                                                      pw = req.headers.pw;

                                                      //console.log(id + ' ' + pw);

                                                      _context5.next = 4;
                                                      return _User2.default.getUserAndProfile(id, pw);

                                                case 4:
                                                      _ref14 = _context5.sent;
                                                      _ref15 = _slicedToArray(_ref14, 3);
                                                      err = _ref15[0];
                                                      user = _ref15[1];
                                                      profile = _ref15[2];

                                                      if (!err) {
                                                            _context5.next = 26;
                                                            break;
                                                      }

                                                      _context5.next = 12;
                                                      return mlanghku.login(id, pw);

                                                case 12:
                                                      _ref16 = _context5.sent;
                                                      _ref17 = _slicedToArray(_ref16, 2);
                                                      err = _ref17[0];
                                                      appUser = _ref17[1];

                                                      if (!err) {
                                                            _context5.next = 19;
                                                            break;
                                                      }

                                                      console.log(err);return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 19:
                                                      _context5.next = 21;
                                                      return _User2.default.aquireNewAccountByAppAccount(appUser.attributes, pw);

                                                case 21:
                                                      _ref18 = _context5.sent;
                                                      _ref19 = _slicedToArray(_ref18, 3);
                                                      err = _ref19[0];
                                                      user = _ref19[1];
                                                      profile = _ref19[2];

                                                case 26:
                                                      //console.log(user);
                                                      //console.log(profile);

                                                      _Log2.default.createLoginLog(user._id);

                                                      profiles = [];
                                                      schools = [];
                                                      courses = [];
                                                      subjects = [];
                                                      projects = [];
                                                      studentProjects = [];
                                                      groups = [];
                                                      cards = [];
                                                      langs = [];
                                                      questionnaires = [];
                                                      questions = [];
                                                      publishes = [];
                                                      submits = [];
                                                      answers = [];

                                                      if (!(profile.joinedSchools.length === 0 && profile.joinedCourses.length > 0)) {
                                                            _context5.next = 74;
                                                            break;
                                                      }

                                                      _context5.next = 44;
                                                      return (0, _to2.default)(_Course2.default.findOne({ _id: profile.joinedCourses[0] }));

                                                case 44:
                                                      _ref20 = _context5.sent;
                                                      _ref21 = _slicedToArray(_ref20, 2);
                                                      err = _ref21[0];
                                                      data = _ref21[1];
                                                      _context5.next = 50;
                                                      return (0, _to2.default)(_User2.default.findOne({ _id: data.teacher }));

                                                case 50:
                                                      _ref22 = _context5.sent;
                                                      _ref23 = _slicedToArray(_ref22, 2);
                                                      err = _ref23[0];
                                                      data = _ref23[1];
                                                      _context5.next = 56;
                                                      return (0, _to2.default)(_Profile2.default.findOne({ belongTo: data._id }));

                                                case 56:
                                                      _ref24 = _context5.sent;
                                                      _ref25 = _slicedToArray(_ref24, 2);
                                                      err = _ref25[0];
                                                      data = _ref25[1];
                                                      _context5.next = 62;
                                                      return (0, _to2.default)(_School2.default.findOne({ _id: data.joinedSchools[0] }));

                                                case 62:
                                                      _ref26 = _context5.sent;
                                                      _ref27 = _slicedToArray(_ref26, 2);
                                                      err = _ref27[0];
                                                      data = _ref27[1];

                                                      schools = [].concat(_toConsumableArray(schools), [data]);
                                                      _context5.next = 69;
                                                      return _School2.default.joinSchool({ user: user, code: data.code });

                                                case 69:
                                                      _ref28 = _context5.sent;
                                                      _ref29 = _slicedToArray(_ref28, 3);
                                                      err = _ref29[0];
                                                      data = _ref29[1];
                                                      profile = _ref29[2];

                                                case 74:

                                                      profiles = [profile];

                                                      _context5.next = 77;
                                                      return _Course2.default.getJoined(profile.joinedCourses);

                                                case 77:
                                                      _ref30 = _context5.sent;
                                                      _ref31 = _slicedToArray(_ref30, 3);
                                                      err = _ref31[0];
                                                      data = _ref31[1];
                                                      teacherProfiles = _ref31[2];

                                                      if (!err) {
                                                            _context5.next = 84;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 84:

                                                      courses = [].concat(_toConsumableArray(courses), _toConsumableArray(data));
                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(teacherProfiles));

                                                      _context5.next = 88;
                                                      return _Subject2.default.getByCourses(data);

                                                case 88:
                                                      _ref32 = _context5.sent;
                                                      _ref33 = _slicedToArray(_ref32, 3);
                                                      err = _ref33[0];
                                                      data = _ref33[1];
                                                      joinedSubjects = _ref33[2];

                                                      if (!err) {
                                                            _context5.next = 95;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 95:

                                                      subjects = [].concat(_toConsumableArray(subjects), _toConsumableArray(data));

                                                      _context5.next = 98;
                                                      return _Project2.default.getBySubjects(data);

                                                case 98:
                                                      _ref34 = _context5.sent;
                                                      _ref35 = _slicedToArray(_ref34, 3);
                                                      err = _ref35[0];
                                                      data = _ref35[1];
                                                      joinedProjects = _ref35[2];

                                                      if (!err) {
                                                            _context5.next = 105;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 105:

                                                      projects = [].concat(_toConsumableArray(projects), _toConsumableArray(data));

                                                      _context5.next = 108;
                                                      return _StudentProject2.default.getByProjects(data);

                                                case 108:
                                                      _ref36 = _context5.sent;
                                                      _ref37 = _slicedToArray(_ref36, 3);
                                                      err = _ref37[0];
                                                      data = _ref37[1];
                                                      joinedStudentProjects = _ref37[2];

                                                      if (!err) {
                                                            _context5.next = 115;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 115:

                                                      studentProjects = [].concat(_toConsumableArray(studentProjects), _toConsumableArray(data));

                                                      _context5.next = 118;
                                                      return _Card2.default.getByStudentProjects(data);

                                                case 118:
                                                      _ref38 = _context5.sent;
                                                      _ref39 = _slicedToArray(_ref38, 3);
                                                      err = _ref39[0];
                                                      data = _ref39[1];
                                                      joinedCards = _ref39[2];

                                                      if (!err) {
                                                            _context5.next = 125;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 125:

                                                      cards = [].concat(_toConsumableArray(cards), _toConsumableArray(data));

                                                      _context5.next = 128;
                                                      return _Group2.default.getByUserAndProjects(user._id, joinedProjects);

                                                case 128:
                                                      _ref40 = _context5.sent;
                                                      _ref41 = _slicedToArray(_ref40, 3);
                                                      err = _ref41[0];
                                                      data = _ref41[1];
                                                      joinedGroups = _ref41[2];

                                                      if (!err) {
                                                            _context5.next = 135;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 135:

                                                      groups = [].concat(_toConsumableArray(groups), _toConsumableArray(data));

                                                      _context5.next = 138;
                                                      return _Course2.default.getTeaching(user._id);

                                                case 138:
                                                      _ref42 = _context5.sent;
                                                      _ref43 = _slicedToArray(_ref42, 3);
                                                      err = _ref43[0];
                                                      data = _ref43[1];
                                                      teachingCourses = _ref43[2];

                                                      if (!err) {
                                                            _context5.next = 145;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 145:

                                                      courses = [].concat(_toConsumableArray(courses), _toConsumableArray(data));

                                                      _context5.next = 148;
                                                      return _Subject2.default.getByCourses(data.slice(0).reverse());

                                                case 148:
                                                      _ref44 = _context5.sent;
                                                      _ref45 = _slicedToArray(_ref44, 3);
                                                      err = _ref45[0];
                                                      data = _ref45[1];
                                                      teachingSubjects = _ref45[2];

                                                      if (!err) {
                                                            _context5.next = 155;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 155:

                                                      subjects = [].concat(_toConsumableArray(subjects), _toConsumableArray(data));

                                                      _context5.next = 158;
                                                      return _Project2.default.getBySubjects(data);

                                                case 158:
                                                      _ref46 = _context5.sent;
                                                      _ref47 = _slicedToArray(_ref46, 3);
                                                      err = _ref47[0];
                                                      data = _ref47[1];
                                                      teachingProjects = _ref47[2];

                                                      if (!err) {
                                                            _context5.next = 165;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 165:

                                                      projects = [].concat(_toConsumableArray(projects), _toConsumableArray(data));

                                                      _context5.next = 168;
                                                      return _StudentProject2.default.getByProjects(data);

                                                case 168:
                                                      _ref48 = _context5.sent;
                                                      _ref49 = _slicedToArray(_ref48, 3);
                                                      err = _ref49[0];
                                                      data = _ref49[1];
                                                      teachingStudentProjects = _ref49[2];

                                                      if (!err) {
                                                            _context5.next = 175;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 175:

                                                      studentProjects = [].concat(_toConsumableArray(studentProjects), _toConsumableArray(data));

                                                      _context5.next = 178;
                                                      return _Card2.default.getByStudentProjects(data);

                                                case 178:
                                                      _ref50 = _context5.sent;
                                                      _ref51 = _slicedToArray(_ref50, 3);
                                                      err = _ref51[0];
                                                      data = _ref51[1];
                                                      teachingCards = _ref51[2];

                                                      if (!err) {
                                                            _context5.next = 185;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 185:

                                                      cards = [].concat(_toConsumableArray(cards), _toConsumableArray(data));

                                                      _context5.next = 188;
                                                      return _Group2.default.getByProjects(teachingProjects);

                                                case 188:
                                                      _ref52 = _context5.sent;
                                                      _ref53 = _slicedToArray(_ref52, 3);
                                                      err = _ref53[0];
                                                      data = _ref53[1];
                                                      teachingGroups = _ref53[2];

                                                      if (!err) {
                                                            _context5.next = 195;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 195:

                                                      groups = [].concat(_toConsumableArray(groups), _toConsumableArray(data));

                                                      _context5.next = 198;
                                                      return _School2.default.getByUser(user._id, profile);

                                                case 198:
                                                      _ref54 = _context5.sent;
                                                      _ref55 = _slicedToArray(_ref54, 3);
                                                      err = _ref55[0];
                                                      data = _ref55[1];
                                                      supervisingSchools = _ref55[2];

                                                      if (!err) {
                                                            _context5.next = 205;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 205:

                                                      schools = [].concat(_toConsumableArray(schools), _toConsumableArray(data));

                                                      _context5.next = 208;
                                                      return _User2.default.getByType('admin');

                                                case 208:
                                                      _ref56 = _context5.sent;
                                                      _ref57 = _slicedToArray(_ref56, 3);
                                                      err = _ref57[0];
                                                      data = _ref57[1];
                                                      adminUsers = _ref57[2];
                                                      admins = [];
                                                      _context5.next = 216;
                                                      return _User2.default.getProfilesByUsers(data);

                                                case 216:
                                                      _ref58 = _context5.sent;
                                                      _ref59 = _slicedToArray(_ref58, 3);
                                                      err = _ref59[0];
                                                      data = _ref59[1];
                                                      admins = _ref59[2];

                                                      if (!err) {
                                                            _context5.next = 223;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 223:

                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(data));

                                                      _context5.next = 226;
                                                      return _Profile2.default.getByStudentProjects(studentProjects);

                                                case 226:
                                                      _ref60 = _context5.sent;
                                                      _ref61 = _slicedToArray(_ref60, 3);
                                                      err = _ref61[0];
                                                      data = _ref61[1];
                                                      profilesId = _ref61[2];

                                                      if (!err) {
                                                            _context5.next = 233;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 233:

                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(data));

                                                      _context5.next = 236;
                                                      return _Lang2.default.getByCards(cards);

                                                case 236:
                                                      _ref62 = _context5.sent;
                                                      _ref63 = _slicedToArray(_ref62, 3);
                                                      err = _ref63[0];
                                                      data = _ref63[1];
                                                      langsId = _ref63[2];

                                                      if (!err) {
                                                            _context5.next = 243;
                                                            break;
                                                      }

                                                      return _context5.abrupt('return', res.json({ result: "failed" }));

                                                case 243:

                                                      langs = [].concat(_toConsumableArray(langs), _toConsumableArray(data));

                                                      createdQuestionnaires = [];
                                                      _context5.next = 247;
                                                      return _Questionnaire2.default.getByAuthor(user._id);

                                                case 247:
                                                      _ref64 = _context5.sent;
                                                      _ref65 = _slicedToArray(_ref64, 3);
                                                      err = _ref65[0];
                                                      data = _ref65[1];
                                                      createdQuestionnaires = _ref65[2];

                                                      questionnaires = [].concat(_toConsumableArray(questionnaires), _toConsumableArray(data));

                                                      assignedPublishes = [];
                                                      _context5.next = 256;
                                                      return _Publish2.default.getAssigned(profile);

                                                case 256:
                                                      _ref66 = _context5.sent;
                                                      _ref67 = _slicedToArray(_ref66, 3);
                                                      err = _ref67[0];
                                                      data = _ref67[1];
                                                      assignedPublishes = _ref67[2];

                                                      publishes = [].concat(_toConsumableArray(publishes), _toConsumableArray(data));

                                                      createdSubmits = [];
                                                      _context5.next = 265;
                                                      return _Submit2.default.getByUserAndPublishesId(user._id, assignedPublishes);

                                                case 265:
                                                      _ref68 = _context5.sent;
                                                      _ref69 = _slicedToArray(_ref68, 3);
                                                      err = _ref69[0];
                                                      data = _ref69[1];
                                                      createdSubmits = _ref69[2];

                                                      submits = [].concat(_toConsumableArray(submits), _toConsumableArray(data));

                                                      _context5.next = 273;
                                                      return _Answer2.default.getBySubmits(data);

                                                case 273:
                                                      _ref70 = _context5.sent;
                                                      _ref71 = _slicedToArray(_ref70, 2);
                                                      err = _ref71[0];
                                                      data = _ref71[1];

                                                      answers = [].concat(_toConsumableArray(answers), _toConsumableArray(data));

                                                      _context5.next = 280;
                                                      return _Questionnaire2.default.getByPublishes(publishes);

                                                case 280:
                                                      _ref72 = _context5.sent;
                                                      _ref73 = _slicedToArray(_ref72, 2);
                                                      err = _ref73[0];
                                                      data = _ref73[1];

                                                      questionnaires = [].concat(_toConsumableArray(questionnaires), _toConsumableArray(data));

                                                      _context5.next = 287;
                                                      return _Question2.default.getByQuestionnaires(questionnaires);

                                                case 287:
                                                      _ref74 = _context5.sent;
                                                      _ref75 = _slicedToArray(_ref74, 2);
                                                      err = _ref75[0];
                                                      data = _ref75[1];

                                                      questions = [].concat(_toConsumableArray(questions), _toConsumableArray(data));

                                                      createdPublishes = [];
                                                      _context5.next = 295;
                                                      return _Publish2.default.getByAuthor(user._id);

                                                case 295:
                                                      _ref76 = _context5.sent;
                                                      _ref77 = _slicedToArray(_ref76, 3);
                                                      err = _ref77[0];
                                                      data = _ref77[1];
                                                      createdPublishes = _ref77[2];

                                                      publishes = [].concat(_toConsumableArray(publishes), _toConsumableArray(data));

                                                      _context5.next = 303;
                                                      return _School2.default.getByPublishes(publishes);

                                                case 303:
                                                      _ref78 = _context5.sent;
                                                      _ref79 = _slicedToArray(_ref78, 2);
                                                      err = _ref79[0];
                                                      data = _ref79[1];

                                                      schools = [].concat(_toConsumableArray(schools), _toConsumableArray(data));

                                                      return _context5.abrupt('return', res.json({
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
                                                      }));

                                                case 309:
                                                case 'end':
                                                      return _context5.stop();
                                          }
                                    }
                              }, _callee5, _this2);
                        }));

                        return function (_x13, _x14, _x15) {
                              return _ref13.apply(this, arguments);
                        };
                  }());
            }
      }]);

      return UserRouter;
}(_Router3.default);

exports.default = UserRouter;
//# sourceMappingURL=user.js.map