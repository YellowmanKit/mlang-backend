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

var _Questionnaire = require('../../models/survey/Questionnaire.js');

var _Questionnaire2 = _interopRequireDefault(_Questionnaire);

var _Publish = require('../../models/survey/Publish.js');

var _Publish2 = _interopRequireDefault(_Publish);

var _Submit = require('../../models/survey/Submit.js');

var _Submit2 = _interopRequireDefault(_Submit);

var _Query = require('../../functions/Query.js');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SurveyRouter = function (_Router) {
  _inherits(SurveyRouter, _Router);

  function SurveyRouter(app) {
    _classCallCheck(this, SurveyRouter);

    var _this = _possibleConstructorReturn(this, (SurveyRouter.__proto__ || Object.getPrototypeOf(SurveyRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(SurveyRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;

      app.post('/survey/submit/edit', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var data, err, submit, answers, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = req.body.data;
                  _context.next = 3;
                  return _Submit2.default.edit(data);

                case 3:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 3);
                  err = _ref3[0];
                  submit = _ref3[1];
                  answers = _ref3[2];
                  return _context.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedSubmit: submit,
                    updatedAnswers: answers
                  }));

                case 9:
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

      app.post('/survey/submit/add', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data, err, submit, answers, _ref5, _ref6;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  _context2.next = 3;
                  return _Submit2.default.add(data);

                case 3:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 3);
                  err = _ref6[0];
                  submit = _ref6[1];
                  answers = _ref6[2];
                  return _context2.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedSubmit: submit,
                    updatedAnswers: answers
                  }));

                case 9:
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

      app.post('/survey/publish/getSubmitted', function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var publish, err, submits, answers, profiles, _ref8, _ref9;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  publish = req.body.data;
                  //console.log(schoolId)

                  _context3.next = 3;
                  return _Submit2.default.getMultiple(publish.submits);

                case 3:
                  _ref8 = _context3.sent;
                  _ref9 = _slicedToArray(_ref8, 4);
                  err = _ref9[0];
                  submits = _ref9[1];
                  answers = _ref9[2];
                  profiles = _ref9[3];

                  if (!err) {
                    _context3.next = 11;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: 'failed' }));

                case 11:
                  return _context3.abrupt('return', res.json({ result: 'success', submits: submits, answers: answers, profiles: profiles }));

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x7, _x8, _x9) {
          return _ref7.apply(this, arguments);
        };
      }());

      app.post('/survey/publish/getStatistics', function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
          var publishId, err, statistics, _ref11, _ref12;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  publishId = req.body.data;
                  //console.log(schoolId)

                  _context4.next = 3;
                  return _Query2.default.getStatisticsByPublish(publishId);

                case 3:
                  _ref11 = _context4.sent;
                  _ref12 = _slicedToArray(_ref11, 2);
                  err = _ref12[0];
                  statistics = _ref12[1];

                  if (!err) {
                    _context4.next = 9;
                    break;
                  }

                  return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 9:
                  return _context4.abrupt('return', res.json({ result: 'success', statistics: statistics }));

                case 10:
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

      app.post('/survey/publish/edit', function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
          var data, err, publish, _ref14, _ref15;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  data = req.body.data;
                  _context5.next = 3;
                  return _Publish2.default.edit(data);

                case 3:
                  _ref14 = _context5.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  publish = _ref15[1];
                  return _context5.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedPublish: publish
                  }));

                case 8:
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

      app.post('/survey/publish/add', function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
          var data, err, publish, school, questionnaire, _ref17, _ref18, _ref19, _ref20;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  data = req.body.data;
                  _context6.next = 3;
                  return _Publish2.default.add(data);

                case 3:
                  _ref17 = _context6.sent;
                  _ref18 = _slicedToArray(_ref17, 3);
                  err = _ref18[0];
                  publish = _ref18[1];
                  school = _ref18[2];

                  if (!publish) {
                    _context6.next = 15;
                    break;
                  }

                  _context6.next = 11;
                  return (0, _to2.default)(_Questionnaire2.default.findOneAndUpdate({ _id: publish.questionnaire }, { $set: { published: true } }, { new: true }));

                case 11:
                  _ref19 = _context6.sent;
                  _ref20 = _slicedToArray(_ref19, 2);
                  err = _ref20[0];
                  questionnaire = _ref20[1];

                case 15:
                  return _context6.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedPublish: publish,
                    updatedQuestionnaire: questionnaire,
                    school: school
                  }));

                case 16:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this2);
        }));

        return function (_x16, _x17, _x18) {
          return _ref16.apply(this, arguments);
        };
      }());

      app.post('/survey/questionnaire/edit', function () {
        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
          var data, err, questionnaire, questions, _ref22, _ref23;

          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  data = req.body.data;
                  _context7.next = 3;
                  return _Questionnaire2.default.edit(data);

                case 3:
                  _ref22 = _context7.sent;
                  _ref23 = _slicedToArray(_ref22, 3);
                  err = _ref23[0];
                  questionnaire = _ref23[1];
                  questions = _ref23[2];
                  return _context7.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedQuestions: questions,
                    updatedQuestionnaire: questionnaire
                  }));

                case 9:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this2);
        }));

        return function (_x19, _x20, _x21) {
          return _ref21.apply(this, arguments);
        };
      }());

      app.post('/survey/questionnaire/add', function () {
        var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
          var data, err, questionnaire, questions, _ref25, _ref26;

          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  data = req.body.data;
                  _context8.next = 3;
                  return _Questionnaire2.default.add(data);

                case 3:
                  _ref25 = _context8.sent;
                  _ref26 = _slicedToArray(_ref25, 3);
                  err = _ref26[0];
                  questionnaire = _ref26[1];
                  questions = _ref26[2];
                  return _context8.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    updatedQuestions: questions,
                    updatedQuestionnaire: questionnaire
                  }));

                case 9:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this2);
        }));

        return function (_x22, _x23, _x24) {
          return _ref24.apply(this, arguments);
        };
      }());
    }
  }]);

  return SurveyRouter;
}(_Router3.default);

exports.default = SurveyRouter;
//# sourceMappingURL=survey.js.map