'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var schoolSchema = _mongoose2.default.Schema({
  admin: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date
  },
  code: {
    type: String,
    required: true
  },
  joinedTeachers: [ObjectId],
  joinedStudents: [ObjectId]
});

var School = module.exports = _mongoose2.default.model('school', schoolSchema);

module.exports.getByPublishes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(publishes) {
    var err, school, schools, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, school = void 0;
            schools = [];
            i = 0;

          case 3:
            if (!(i < publishes.length)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return (0, _to2.default)(School.findOne({ _id: publishes[i].school }));

          case 6:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            school = _ref3[1];

            schools = [].concat(_toConsumableArray(schools), [school]);

          case 11:
            i++;
            _context.next = 3;
            break;

          case 14:
            return _context.abrupt('return', [err, schools]);

          case 15:
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

module.exports.getByUser = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, profile) {
    var err, school, schools, supervisingSchools, joinedSchools, _ref5, _ref6, i, _ref7, _ref8;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, school = void 0;
            schools = [];
            supervisingSchools = [];
            joinedSchools = profile.joinedSchools;
            _context2.next = 6;
            return (0, _to2.default)(School.find({ admin: userId }));

          case 6:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            schools = _ref6[1];

            if (!(err || schools === null)) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('return', res.json({ result: "failed" }));

          case 12:
            for (i = 0; i < schools.length; i++) {
              supervisingSchools.push(schools[i]._id);
            }

            i = 0;

          case 14:
            if (!(i < joinedSchools.length)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 17;
            return (0, _to2.default)(School.findById(joinedSchools[i]));

          case 17:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            err = _ref8[0];
            school = _ref8[1];

            schools = [].concat(_toConsumableArray(schools), [school]);

          case 22:
            i++;
            _context2.next = 14;
            break;

          case 25:
            return _context2.abrupt('return', [err, schools, supervisingSchools]);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

/*module.exports.leaveSchool = async (data, cb)=>{
  let err, schoolToLeave, updatedProfile, updatedUser;

  [err, schoolToLeave] = await to(School.findOneAndUpdate({code: data.code}, { $pull: {
    joinedTeachers: data.userId
  }}, {new: true}))
  if(err || schoolToLeave === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $pull: {
    joinedSchools: schoolToLeave._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  if(updatedProfile.joinedSchools.length === 0){
    [err, updatedUser] = await to(User.findOneAndUpdate({_id: data.userId}, { $set: {
      type: 'student'
    }}, {new: true}))
    if(err || updatedUser === null){ cb('failed'); };
  }

  cb('success', schoolToLeave, updatedProfile, updatedUser)
}*/

module.exports.joinSchool = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var err, schoolToJoin, updatedProfile, toPush, _ref10, _ref11, _ref12, _ref13;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0, schoolToJoin = void 0, updatedProfile = void 0;
            toPush = data.user.type === 'teacher' ? { joinedTeachers: data.user._id } : data.user.type === 'student' ? { joinedStudents: data.user._id } : {};
            _context3.next = 4;
            return (0, _to2.default)(School.findOneAndUpdate({ code: data.code }, { $push: toPush }, { new: true }));

          case 4:
            _ref10 = _context3.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            err = _ref11[0];
            schoolToJoin = _ref11[1];
            _context3.next = 10;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: data.user._id }, { $push: {
                joinedSchools: schoolToJoin._id
              } }, { new: true }));

          case 10:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            updatedProfile = _ref13[1];
            return _context3.abrupt('return', [err, schoolToJoin, updatedProfile]);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x4) {
    return _ref9.apply(this, arguments);
  };
}();

module.exports.addSchool = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(newSchool, cb) {
    var err, school, newCode, i, _ref15, _ref16, _ref17, _ref18;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            err = void 0, school = void 0;
            newCode = '';
            i = 0;

          case 3:
            if (!(i < 99)) {
              _context4.next = 17;
              break;
            }

            newCode = _randomstring2.default.generate({
              length: 5,
              charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
            });

            _context4.next = 7;
            return (0, _to2.default)(School.findOne({ code: newCode }));

          case 7:
            _ref15 = _context4.sent;
            _ref16 = _slicedToArray(_ref15, 2);
            err = _ref16[0];
            school = _ref16[1];

            if (!(!err && school === null)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt('break', 17);

          case 13:
            ;

          case 14:
            i++;
            _context4.next = 3;
            break;

          case 17:

            newSchool['code'] = newCode;
            newSchool['createdAt'] = new Date();

            _context4.next = 21;
            return (0, _to2.default)(School.create(newSchool));

          case 21:
            _ref17 = _context4.sent;
            _ref18 = _slicedToArray(_ref17, 2);
            err = _ref18[0];
            school = _ref18[1];

            if (!err) {
              _context4.next = 29;
              break;
            }

            cb('failed');console.log(err);return _context4.abrupt('return');

          case 29:

            cb('success', school);

          case 30:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x5, _x6) {
    return _ref14.apply(this, arguments);
  };
}();

module.exports.codeExist = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(code) {
    var err, school, _ref20, _ref21;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            err = void 0, school = void 0;
            _context5.next = 3;
            return (0, _to2.default)(School.findOne({ code: code }));

          case 3:
            _ref20 = _context5.sent;
            _ref21 = _slicedToArray(_ref20, 2);
            err = _ref21[0];
            school = _ref21[1];

            if (!(err || !school)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt('return', false);

          case 9:
            return _context5.abrupt('return', true);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x7) {
    return _ref19.apply(this, arguments);
  };
}();
//# sourceMappingURL=School.js.map