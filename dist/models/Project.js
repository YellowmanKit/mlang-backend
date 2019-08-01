'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var projectSchema = _mongoose2.default.Schema({
  subject: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
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
  endDate: {
    type: Date,
    default: new Date()
  },
  studentProjects: [ObjectId]
});

var Project = module.exports = _mongoose2.default.model('project', projectSchema);

module.exports.getByStudentProjects = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(studentProjects) {
    var err, project, projectsId, projects, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, project = void 0;
            projectsId = [];
            projects = [];
            i = 0;

          case 4:
            if (!(i < studentProjects.length)) {
              _context.next = 18;
              break;
            }

            _context.next = 7;
            return (0, _to2.default)(Project.findById(studentProjects[i].project));

          case 7:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            project = _ref3[1];

            if (!err) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('continue', 15);

          case 13:
            projects.push(project);
            projectsId.push(project._id);

          case 15:
            i++;
            _context.next = 4;
            break;

          case 18:
            return _context.abrupt('return', [err, projects, projectsId]);

          case 19:
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

module.exports.getBySubjects = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(subjects) {
    var err, project, projectsId, projects, i, _ref5, _ref6;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, project = void 0;
            projectsId = [];
            projects = [];


            for (i = 0; i < subjects.length; i++) {
              projectsId = [].concat(_toConsumableArray(projectsId), _toConsumableArray(subjects[i].projects));
            }

            i = 0;

          case 5:
            if (!(i < projectsId.length)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 8;
            return (0, _to2.default)(Project.findById(projectsId[i]));

          case 8:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            project = _ref6[1];

            projects.push(project);

          case 13:
            i++;
            _context2.next = 5;
            break;

          case 16:
            return _context2.abrupt('return', [err, projects, projectsId]);

          case 17:
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
//# sourceMappingURL=Project.js.map