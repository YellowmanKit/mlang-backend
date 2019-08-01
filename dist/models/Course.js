'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var courseSchema = _mongoose2.default.Schema({
  teacher: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    required: true
  },
  joinedStudents: [ObjectId],
  subjects: [ObjectId]
});

var Course = module.exports = _mongoose2.default.model('course', courseSchema);

module.exports.getBySubjects = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(subjects) {
    var err, course, coursesId, courses, i, j, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, course = void 0;
            coursesId = [];
            courses = [];
            i = 0;

          case 4:
            if (!(i < subjects.length)) {
              _context.next = 17;
              break;
            }

            if (coursesId.length === 0) {
              coursesId.push(subjects[i].course);
            }
            j = 0;

          case 7:
            if (!(j < coursesId.length)) {
              _context.next = 14;
              break;
            }

            if (!(coursesId[j] === subjects[i].course)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('break', 14);

          case 10:
            if (j === coursesId.length) {
              coursesId.push(subjects[i].course);
            }

          case 11:
            j++;
            _context.next = 7;
            break;

          case 14:
            i++;
            _context.next = 4;
            break;

          case 17:
            i = 0;

          case 18:
            if (!(i < coursesId.length)) {
              _context.next = 29;
              break;
            }

            _context.next = 21;
            return (0, _to2.default)(Course.findById(coursesId[i]));

          case 21:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            course = _ref3[1];

            courses.push(course);

          case 26:
            i++;
            _context.next = 18;
            break;

          case 29:
            return _context.abrupt('return', [err, courses, coursesId]);

          case 30:
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

module.exports.getBySchool = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(school) {
    var err, data, coursesId, courses, teachers, i, _ref5, _ref6;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, data = void 0;
            coursesId = [];
            courses = [];
            teachers = school.joinedTeachers;
            i = 0;

          case 5:
            if (!(i < teachers.length)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 8;
            return (0, _to2.default)(Course.find({ teacher: teachers[i] }));

          case 8:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            data = _ref6[1];

            courses = [].concat(_toConsumableArray(courses), _toConsumableArray(data));

          case 13:
            i++;
            _context2.next = 5;
            break;

          case 16:
            for (i = 0; i < courses.length; i++) {
              coursesId = [].concat(_toConsumableArray(coursesId), [courses[i]._id]);
            }
            return _context2.abrupt('return', [err, courses, coursesId]);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.getTeaching = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(teacherId) {
    var err, course, courses, teachingCourses, _ref8, _ref9, i;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0, course = void 0;
            courses = [];
            teachingCourses = [];
            _context3.next = 5;
            return (0, _to2.default)(Course.find({ teacher: teacherId }, null, { sort: { endDate: 'descending' } }));

          case 5:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            courses = _ref9[1];

            for (i = 0; i < courses.length; i++) {
              teachingCourses.push(courses[i]._id);
            }

            return _context3.abrupt('return', [err, courses, teachingCourses]);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports.getJoined = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(joinedCourses) {
    var err, course, profile, courses, profiles, i, _ref11, _ref12, _ref13, _ref14;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            err = void 0, course = void 0, profile = void 0;
            courses = [];
            profiles = [];
            i = 0;

          case 4:
            if (!(i < joinedCourses.length)) {
              _context4.next = 26;
              break;
            }

            _context4.next = 7;
            return (0, _to2.default)(Course.findById(joinedCourses[i]));

          case 7:
            _ref11 = _context4.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            err = _ref12[0];
            course = _ref12[1];

            if (!(err || course === null)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt('return', ['error']);

          case 13:

            courses.push(course);

            _context4.next = 16;
            return (0, _to2.default)(_Profile2.default.findOne({ belongTo: course.teacher }));

          case 16:
            _ref13 = _context4.sent;
            _ref14 = _slicedToArray(_ref13, 2);
            err = _ref14[0];
            profile = _ref14[1];

            if (!(err || profile === null)) {
              _context4.next = 22;
              break;
            }

            return _context4.abrupt('return', ['error']);

          case 22:
            profiles.push(profile);

          case 23:
            i++;
            _context4.next = 4;
            break;

          case 26:
            return _context4.abrupt('return', [err, courses, profiles]);

          case 27:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref10.apply(this, arguments);
  };
}();

module.exports.leaveCourse = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data, cb) {
    var err, courseToLeave, updatedProfile, _ref16, _ref17, _ref18, _ref19;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            err = void 0, courseToLeave = void 0, updatedProfile = void 0;
            _context5.next = 3;
            return (0, _to2.default)(Course.findOneAndUpdate({ code: data.code }, { $pull: {
                joinedStudents: data.userId
              } }, { new: true }));

          case 3:
            _ref16 = _context5.sent;
            _ref17 = _slicedToArray(_ref16, 2);
            err = _ref17[0];
            courseToLeave = _ref17[1];

            if (err || courseToLeave === null) {
              cb('failed');
            };

            _context5.next = 11;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: data.userId }, { $pull: {
                joinedCourses: courseToLeave._id
              } }, { new: true }));

          case 11:
            _ref18 = _context5.sent;
            _ref19 = _slicedToArray(_ref18, 2);
            err = _ref19[0];
            updatedProfile = _ref19[1];

            if (err || updatedProfile === null) {
              cb('failed');
            };

            cb('success', courseToLeave, updatedProfile);

          case 18:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5, _x6) {
    return _ref15.apply(this, arguments);
  };
}();

module.exports.joinCourse = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data, cb) {
    var err, courseToJoin, updatedProfile, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            err = void 0, courseToJoin = void 0, updatedProfile = void 0;
            _context6.next = 3;
            return (0, _to2.default)(Course.findOne({ code: data.code }));

          case 3:
            _ref21 = _context6.sent;
            _ref22 = _slicedToArray(_ref21, 2);
            err = _ref22[0];
            courseToJoin = _ref22[1];

            if (err || courseToJoin === null) {
              cb('failed');
            };

            if (!(courseToJoin.joinedStudents.indexOf(data.userId) > -1)) {
              _context6.next = 12;
              break;
            }

            cb('failed - course already joined');return _context6.abrupt('return');

          case 12:
            _context6.next = 14;
            return (0, _to2.default)(Course.findOneAndUpdate({ code: data.code }, { $push: {
                joinedStudents: data.userId
              } }, { new: true }));

          case 14:
            _ref23 = _context6.sent;
            _ref24 = _slicedToArray(_ref23, 2);
            err = _ref24[0];
            courseToJoin = _ref24[1];

            if (err || courseToJoin === null) {
              cb('failed');
            };

            _context6.next = 22;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: data.userId }, { $push: {
                joinedCourses: courseToJoin._id
              } }, { new: true }));

          case 22:
            _ref25 = _context6.sent;
            _ref26 = _slicedToArray(_ref25, 2);
            err = _ref26[0];
            updatedProfile = _ref26[1];

            if (err || updatedProfile === null) {
              cb('failed');
            };

            cb('success', courseToJoin, updatedProfile);

          case 29:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x7, _x8) {
    return _ref20.apply(this, arguments);
  };
}();

module.exports.addCourse = function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(newCourse, cb) {
    var err, course, newCode, i, _ref28, _ref29, _ref30, _ref31;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            err = void 0, course = void 0;
            newCode = '';
            i = 0;

          case 3:
            if (!(i < 99)) {
              _context7.next = 17;
              break;
            }

            newCode = _randomstring2.default.generate({
              length: 5,
              charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
            });

            _context7.next = 7;
            return (0, _to2.default)(Course.findOne({ code: newCode }));

          case 7:
            _ref28 = _context7.sent;
            _ref29 = _slicedToArray(_ref28, 2);
            err = _ref29[0];
            course = _ref29[1];

            if (!(!err && course === null)) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt('break', 17);

          case 13:
            ;

          case 14:
            i++;
            _context7.next = 3;
            break;

          case 17:

            newCourse['code'] = newCode;

            _context7.next = 20;
            return (0, _to2.default)(Course.create(newCourse));

          case 20:
            _ref30 = _context7.sent;
            _ref31 = _slicedToArray(_ref30, 2);
            err = _ref31[0];
            course = _ref31[1];

            if (!err) {
              _context7.next = 28;
              break;
            }

            cb('failed');console.log(err);return _context7.abrupt('return');

          case 28:

            //console.log(course)
            cb('success', course);

          case 29:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x9, _x10) {
    return _ref27.apply(this, arguments);
  };
}();

module.exports.codeExist = function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(code) {
    var err, course, _ref33, _ref34;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            err = void 0, course = void 0;
            _context8.next = 3;
            return (0, _to2.default)(Course.findOne({ code: code }));

          case 3:
            _ref33 = _context8.sent;
            _ref34 = _slicedToArray(_ref33, 2);
            err = _ref34[0];
            course = _ref34[1];

            if (!(err || !course)) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt('return', false);

          case 9:
            return _context8.abrupt('return', true);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x11) {
    return _ref32.apply(this, arguments);
  };
}();
//# sourceMappingURL=Course.js.map