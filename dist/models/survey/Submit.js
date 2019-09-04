'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Model = require('../Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('../Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _Answer = require('./Answer');

var _Answer2 = _interopRequireDefault(_Answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var submitSchema = _mongoose2.default.Schema({
  publish: {
    type: ObjectId
  },
  questionnaire: {
    type: ObjectId
  },
  submittedBy: {
    type: ObjectId
  },
  createdAt: {
    type: Date
  },
  answers: [ObjectId]
});

var Submit = module.exports = _mongoose2.default.model('submit', submitSchema);

module.exports.getMultiple = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(submitsId) {
    var err, profile, data, submits, answers, profiles, _ref2, _ref3, i, _ref4, _ref5, _ref6, _ref7;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            submits = [];
            answers = [];
            profiles = [];
            _context.next = 5;
            return (0, _to2.default)(Submit.find({ _id: { $in: submitsId } }));

          case 5:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            submits = _ref3[1];
            i = 0;

          case 10:
            if (!(i < submits.length)) {
              _context.next = 28;
              break;
            }

            _context.next = 13;
            return (0, _to2.default)(_Profile2.default.findOne({ belongTo: submits[i].submittedBy }));

          case 13:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            profile = _ref5[1];

            profiles = [].concat(_toConsumableArray(profiles), [profile]);

            _context.next = 20;
            return (0, _to2.default)(_Answer2.default.find({ _id: { $in: submits[i].answers } }));

          case 20:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            err = _ref7[0];
            data = _ref7[1];

            answers = [].concat(_toConsumableArray(answers), _toConsumableArray(data));

          case 25:
            i++;
            _context.next = 10;
            break;

          case 28:
            return _context.abrupt('return', [err, submits, answers, profiles]);

          case 29:
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

module.exports.getByUserAndPublishesId = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, publishesId) {
    var err, submit, submits, submitsId, i, _ref9, _ref10;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            submits = [];
            submitsId = [];
            i = 0;

          case 3:
            if (!(i < publishesId.length)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 6;
            return (0, _to2.default)(Submit.findOne({ publish: publishesId[i], submittedBy: userId }));

          case 6:
            _ref9 = _context2.sent;
            _ref10 = _slicedToArray(_ref9, 2);
            err = _ref10[0];
            submit = _ref10[1];

            if (submit) {
              submits = [].concat(_toConsumableArray(submits), [submit]);
              submitsId = [].concat(_toConsumableArray(submitsId), [submit._id]);
            }

          case 11:
            i++;
            _context2.next = 3;
            break;

          case 14:
            return _context2.abrupt('return', [err, submits, submitsId]);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2, _x3) {
    return _ref8.apply(this, arguments);
  };
}();

module.exports.edit = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var err, answer, submit, answers, answersId, rawAnswers, key, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            answers = [];
            answersId = [];
            rawAnswers = data.answers;
            //console.log(data);

            _context3.t0 = regeneratorRuntime.keys(rawAnswers);

          case 4:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 25;
              break;
            }

            key = _context3.t1.value;

            if (!rawAnswers[key].answer) {
              _context3.next = 15;
              break;
            }

            _context3.next = 9;
            return _Answer2.default.edit(rawAnswers[key]);

          case 9:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            answer = _ref13[1];
            _context3.next = 21;
            break;

          case 15:
            _context3.next = 17;
            return _Answer2.default.add({ submit: data.submit._id, question: key, value: rawAnswers[key].value });

          case 17:
            _ref14 = _context3.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            err = _ref15[0];
            answer = _ref15[1];

          case 21:
            answers.push(answer);
            answersId.push(answer._id);
            _context3.next = 4;
            break;

          case 25:
            _context3.next = 27;
            return (0, _to2.default)(Submit.findOneAndUpdate({ _id: data.submit }, { answers: answersId }, { new: true }));

          case 27:
            _ref16 = _context3.sent;
            _ref17 = _slicedToArray(_ref16, 2);
            err = _ref17[0];
            submit = _ref17[1];
            return _context3.abrupt('return', [err, submit, answers]);

          case 32:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x4) {
    return _ref11.apply(this, arguments);
  };
}();

module.exports.add = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
    var err, answer, submit, publish, answers, answersId, rawAnswers, _ref19, _ref20, _ref21, _ref22, key, _ref23, _ref24, _ref25, _ref26;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            answers = [];
            answersId = [];
            rawAnswers = data.answers;
            _context4.next = 5;
            return (0, _to2.default)(Submit.create({ publish: data.publish, questionnaire: data.questionnaire, submittedBy: data.submittedBy, createdAt: new Date() }));

          case 5:
            _ref19 = _context4.sent;
            _ref20 = _slicedToArray(_ref19, 2);
            err = _ref20[0];
            submit = _ref20[1];
            _context4.next = 11;
            return (0, _to2.default)(_Publish2.default.findOneAndUpdate({ _id: submit.publish }, { $push: { submits: submit._id } }, { new: true }));

          case 11:
            _ref21 = _context4.sent;
            _ref22 = _slicedToArray(_ref21, 2);
            err = _ref22[0];
            publish = _ref22[1];
            _context4.t0 = regeneratorRuntime.keys(rawAnswers);

          case 16:
            if ((_context4.t1 = _context4.t0()).done) {
              _context4.next = 28;
              break;
            }

            key = _context4.t1.value;
            _context4.next = 20;
            return _Answer2.default.add({ submit: submit._id, question: key, value: rawAnswers[key].value });

          case 20:
            _ref23 = _context4.sent;
            _ref24 = _slicedToArray(_ref23, 2);
            err = _ref24[0];
            answer = _ref24[1];

            answers = [].concat(_toConsumableArray(answers), [answer]);
            answersId = [].concat(_toConsumableArray(answersId), [answer._id]);
            _context4.next = 16;
            break;

          case 28:
            _context4.next = 30;
            return (0, _to2.default)(Submit.findOneAndUpdate({ _id: submit._id }, { answers: answersId }, { new: true }));

          case 30:
            _ref25 = _context4.sent;
            _ref26 = _slicedToArray(_ref25, 2);
            err = _ref26[0];
            submit = _ref26[1];
            return _context4.abrupt('return', [err, submit, answers]);

          case 35:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x5) {
    return _ref18.apply(this, arguments);
  };
}();
//# sourceMappingURL=Submit.js.map