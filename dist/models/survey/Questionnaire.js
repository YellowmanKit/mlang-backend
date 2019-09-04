'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Model = require('../Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Question = require('./Question');

var _Question2 = _interopRequireDefault(_Question);

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var questionaireSchema = _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date
  },
  published: {
    type: Boolean
  },
  questions: [ObjectId]
});

var Questionnaire = module.exports = _mongoose2.default.model('questionnaire', questionaireSchema);

module.exports.getByPublishes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(publishes) {
    var err, quest, quests, questsId, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            quests = [];
            questsId = [];
            i = 0;

          case 3:
            if (!(i < publishes.length)) {
              _context.next = 15;
              break;
            }

            _context.next = 6;
            return (0, _to2.default)(Questionnaire.findOne({ _id: publishes[i].questionnaire }));

          case 6:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            quest = _ref3[1];

            quests = [].concat(_toConsumableArray(quests), [quest]);
            questsId = [].concat(_toConsumableArray(questsId), [quest._id]);

          case 12:
            i++;
            _context.next = 3;
            break;

          case 15:
            return _context.abrupt('return', [err, quests, questsId]);

          case 16:
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

module.exports.getByAuthor = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId) {
    var err, quests, questsId, _ref5, _ref6, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            questsId = [];
            _context2.next = 3;
            return (0, _to2.default)(Questionnaire.find({ author: userId }));

          case 3:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            quests = _ref6[1];


            for (i = 0; i < quests.length; i++) {
              questsId.push(quests[i]._id);
            }

            return _context2.abrupt('return', [err, quests, questsId]);

          case 9:
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

module.exports.edit = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var editQuestions, err, question, questionnaire, questions, questionsId, i, options, j, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            editQuestions = data.newEditQuestions;
            questions = [];
            questionsId = [];
            i = 0;

          case 4:
            if (!(i < editQuestions.length)) {
              _context3.next = 27;
              break;
            }

            options = [];

            for (j = 0; j < editQuestions[i].options.length; j++) {
              options.push(editQuestions[i].options[j].name);
            }

            if (!editQuestions[i]._id) {
              _context3.next = 16;
              break;
            }

            _context3.next = 10;
            return (0, _to2.default)(_Question2.default.findOneAndUpdate({ _id: editQuestions[i]._id }, { title: editQuestions[i].title, type: editQuestions[i].type, options: options }, { new: true }));

          case 10:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            question = _ref9[1];
            _context3.next = 22;
            break;

          case 16:
            _context3.next = 18;
            return (0, _to2.default)(_Question2.default.create({ title: editQuestions[i].title, type: editQuestions[i].type, options: options }));

          case 18:
            _ref10 = _context3.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            err = _ref11[0];
            question = _ref11[1];

          case 22:
            questions.push(question);
            questionsId.push(question._id);

          case 24:
            i++;
            _context3.next = 4;
            break;

          case 27:
            _context3.next = 29;
            return (0, _to2.default)(Questionnaire.findOneAndUpdate({ _id: data.questionnaire._id }, { title: data.newTitle, questions: questionsId }, { new: true }));

          case 29:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            questionnaire = _ref13[1];
            return _context3.abrupt('return', [err, questionnaire, questions]);

          case 34:
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

module.exports.add = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
    var editQuestions, err, question, questionnaire, questions, questionsId, i, options, j, _ref15, _ref16, _ref17, _ref18;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            editQuestions = data.editQuestions;
            questions = [];
            questionsId = [];
            i = 0;

          case 4:
            if (!(i < editQuestions.length)) {
              _context4.next = 18;
              break;
            }

            options = [];

            for (j = 0; j < editQuestions[i].options.length; j++) {
              options.push(editQuestions[i].options[j].name);
            }
            _context4.next = 9;
            return (0, _to2.default)(_Question2.default.create({ title: editQuestions[i].title, type: editQuestions[i].type, options: options }));

          case 9:
            _ref15 = _context4.sent;
            _ref16 = _slicedToArray(_ref15, 2);
            err = _ref16[0];
            question = _ref16[1];

            questions.push(question);
            questionsId.push(question._id);

          case 15:
            i++;
            _context4.next = 4;
            break;

          case 18:
            _context4.next = 20;
            return (0, _to2.default)(Questionnaire.create({ title: data.title, author: data.author, questions: questionsId, createdAt: new Date() }));

          case 20:
            _ref17 = _context4.sent;
            _ref18 = _slicedToArray(_ref17, 2);
            err = _ref18[0];
            questionnaire = _ref18[1];
            return _context4.abrupt('return', [err, questionnaire, questions]);

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref14.apply(this, arguments);
  };
}();
//# sourceMappingURL=Questionnaire.js.map