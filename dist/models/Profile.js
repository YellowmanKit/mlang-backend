'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var profileSchema = _mongoose2.default.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  joinedSchools: [ObjectId],
  joinedCourses: [ObjectId],

  cardCount: {
    type: Number,
    default: 0
  },
  featuredCount: {
    type: Number,
    default: 0
  }
});

var Profile = module.exports = _mongoose2.default.model('profile', profileSchema);

module.exports.getStudents = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(coursesId) {
    var err, profiles, profilesId, _ref2, _ref3, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0;
            profiles = [];
            profilesId = [];
            _context.next = 5;
            return (0, _to2.default)(Profile.find({ joinedCourses: { $in: coursesId } }));

          case 5:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            profiles = _ref3[1];

            for (i = 0; i < profiles.length; i++) {
              profilesId = [].concat(_toConsumableArray(profilesId), [profiles[i]._id]);
            }

            return _context.abrupt('return', [err, profiles, profilesId]);

          case 11:
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

module.exports.getTeachers = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(schoolId) {
    var err, profiles, profilesId, _ref5, _ref6, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0;
            profiles = [];
            profilesId = [];
            _context2.next = 5;
            return (0, _to2.default)(Profile.find({ joinedSchools: schoolId }));

          case 5:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            profiles = _ref6[1];

            for (i = 0; i < profiles.length; i++) {
              profilesId = [].concat(_toConsumableArray(profilesId), [profiles[i]._id]);
            }

            return _context2.abrupt('return', [err, profiles, profilesId]);

          case 11:
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
//# sourceMappingURL=Profile.js.map