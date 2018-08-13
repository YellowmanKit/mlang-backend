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

var _Course = require('../../models/Course.js');

var _Course2 = _interopRequireDefault(_Course);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectRouter = function (_Router) {
  _inherits(ProjectRouter, _Router);

  function ProjectRouter(app) {
    _classCallCheck(this, ProjectRouter);

    var _this = _possibleConstructorReturn(this, (ProjectRouter.__proto__ || Object.getPrototypeOf(ProjectRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(ProjectRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/mlang');
      var db = _mongoose2.default.connection;

      app.post('/project/getMultiple', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var list, err, project, _projects, i, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, project = void 0;
                  _projects = [];
                  i = 0;

                case 4:
                  if (!(i < list.length)) {
                    _context.next = 17;
                    break;
                  }

                  _context.next = 7;
                  return (0, _to2.default)(_Project2.default.findById(list[i]));

                case 7:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  project = _ref3[1];

                  if (!err) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  _projects.splice(0, 0, project);

                case 14:
                  i++;
                  _context.next = 4;
                  break;

                case 17:
                  return _context.abrupt('return', res.json({
                    result: 'success',
                    projects: _projects
                  }));

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      app.post('/project/edit', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var project, err, editedProject, _ref5, _ref6;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  project = req.body.data;
                  //console.log(data)

                  err = void 0, editedProject = void 0;
                  _context2.next = 4;
                  return (0, _to2.default)(_Project2.default.findOneAndUpdate({ _id: project._id }, { $set: {
                      icon: project.icon,
                      title: project.title,
                      description: project.description,
                      endDate: project.endDate
                    } }, { new: true }));

                case 4:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  err = _ref6[0];
                  editedProject = _ref6[1];
                  return _context2.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedProject: editedProject
                  }));

                case 9:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.post('/project/add', function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
          var project, err, _newProject, _updatedCourse, _ref8, _ref9, _ref10, _ref11;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  project = req.body.data;

                  console.log(project);
                  err = void 0, _newProject = void 0, _updatedCourse = void 0;
                  _context3.next = 5;
                  return (0, _to2.default)(_Project2.default.create(project));

                case 5:
                  _ref8 = _context3.sent;
                  _ref9 = _slicedToArray(_ref8, 2);
                  err = _ref9[0];
                  _newProject = _ref9[1];

                  if (!err) {
                    _context3.next = 11;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: 'failed' }));

                case 11:
                  _context3.next = 13;
                  return (0, _to2.default)(_Course2.default.findOneAndUpdate({ _id: project.course }, { $push: {
                      projects: _newProject._id
                    } }, { new: true }));

                case 13:
                  _ref10 = _context3.sent;
                  _ref11 = _slicedToArray(_ref10, 2);
                  err = _ref11[0];
                  _updatedCourse = _ref11[1];

                  if (err || _updatedCourse === null) {
                    cb('failed');
                  };

                  return _context3.abrupt('return', res.json({
                    result: 'success',
                    newProject: _newProject,
                    updatedCourse: _updatedCourse
                  }));

                case 20:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x6, _x7) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }]);

  return ProjectRouter;
}(_Router3.default);

exports.default = ProjectRouter;
//# sourceMappingURL=project.js.map