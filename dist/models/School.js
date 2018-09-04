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
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    required: true
  },
  joinedTeachers: [ObjectId]
});

var School = module.exports = _mongoose2.default.model('school', schoolSchema);

module.exports.leaveSchool = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, cb) {
    var err, schoolToLeave, updatedProfile, _ref2, _ref3, _ref4, _ref5;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, schoolToLeave = void 0, updatedProfile = void 0;
            _context.next = 3;
            return (0, _to2.default)(School.findOneAndUpdate({ code: data.code }, { $pull: {
                joinedTeachers: data.userId
              } }, { new: true }));

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            schoolToLeave = _ref3[1];

            if (err || schoolToLeave === null) {
              cb('failed');
            };

            _context.next = 11;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: data.userId }, { $pull: {
                joinedSchools: schoolToLeave._id
              } }, { new: true }));

          case 11:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            updatedProfile = _ref5[1];

            if (err || updatedProfile === null) {
              cb('failed');
            };

            cb('success', schoolToLeave, updatedProfile);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.joinSchool = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, cb) {
    var err, schoolToJoin, updatedProfile, _ref7, _ref8, _ref9, _ref10;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, schoolToJoin = void 0, updatedProfile = void 0;
            _context2.next = 3;
            return (0, _to2.default)(School.findOneAndUpdate({ code: data.code }, { $push: {
                joinedTeachers: data.userId
              } }, { new: true }));

          case 3:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            err = _ref8[0];
            schoolToJoin = _ref8[1];

            if (err || schoolToJoin === null) {
              cb('failed');
            };

            _context2.next = 11;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: data.userId }, { $push: {
                joinedSchools: schoolToJoin._id
              } }, { new: true }));

          case 11:
            _ref9 = _context2.sent;
            _ref10 = _slicedToArray(_ref9, 2);
            err = _ref10[0];
            updatedProfile = _ref10[1];

            if (err || updatedProfile === null) {
              cb('failed');
            };

            cb('success', schoolToJoin, updatedProfile);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports.addSchool = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(newSchool, cb) {
    var err, school, newCode, i, _ref12, _ref13, _ref14, _ref15;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0, school = void 0;
            newCode = '';
            i = 0;

          case 3:
            if (!(i < 99)) {
              _context3.next = 17;
              break;
            }

            newCode = _randomstring2.default.generate({
              length: 5,
              charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
            });

            _context3.next = 7;
            return (0, _to2.default)(School.findOne({ code: newCode }));

          case 7:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            school = _ref13[1];

            if (!(!err && school === null)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt('break', 17);

          case 13:
            ;

          case 14:
            i++;
            _context3.next = 3;
            break;

          case 17:

            newSchool['code'] = newCode;

            _context3.next = 20;
            return (0, _to2.default)(School.create(newSchool));

          case 20:
            _ref14 = _context3.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            err = _ref15[0];
            school = _ref15[1];

            if (!err) {
              _context3.next = 28;
              break;
            }

            cb('failed');console.log(err);return _context3.abrupt('return');

          case 28:

            //console.log(School)
            cb('success', school);

          case 29:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref11.apply(this, arguments);
  };
}();
//# sourceMappingURL=School.js.map