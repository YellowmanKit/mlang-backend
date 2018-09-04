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

var _School = require('../../models/School.js');

var _School2 = _interopRequireDefault(_School);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchoolRouter = function (_Router) {
  _inherits(SchoolRouter, _Router);

  function SchoolRouter(app) {
    _classCallCheck(this, SchoolRouter);

    var _this = _possibleConstructorReturn(this, (SchoolRouter.__proto__ || Object.getPrototypeOf(SchoolRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(SchoolRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/mlang');
      var db = _mongoose2.default.connection;

      app.post('/school/leave', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.leaveSchool(data, function (result, leavedSchool, updatedProfile) {
                    return res.json({
                      result: result,
                      leavedSchool: leavedSchool,
                      updatedProfile: updatedProfile
                    });
                  });

                case 2:
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

      app.post('/school/join', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.joinSchool(data, function (result, joinedSchool, updatedProfile) {
                    return res.json({
                      result: result,
                      joinedSchool: joinedSchool,
                      updatedProfile: updatedProfile
                    });
                  });

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }());

      app.post('/school/edit', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var school, err, editedSchool, _ref4, _ref5;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  school = req.body.data;
                  //console.log(data)

                  err = void 0, editedSchool = void 0;
                  _context3.next = 4;
                  return (0, _to2.default)(_School2.default.findOneAndUpdate({ _id: school._id }, { $set: school }, { new: true }));

                case 4:
                  _ref4 = _context3.sent;
                  _ref5 = _slicedToArray(_ref4, 2);
                  err = _ref5[0];
                  editedSchool = _ref5[1];
                  return _context3.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedSchool: editedSchool
                  }));

                case 9:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }());

      app.post('/school/add', function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.addSchool(data, function (result, newSchool) {
                    return res.json({
                      result: result,
                      newSchool: newSchool
                    });
                  });

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x10, _x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }]);

  return SchoolRouter;
}(_Router3.default);

exports.default = SchoolRouter;
//# sourceMappingURL=school.js.map