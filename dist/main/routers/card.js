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

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;
//import multer from 'multer';

var CardRouter = function (_Router) {
  _inherits(CardRouter, _Router);

  function CardRouter(app) {
    _classCallCheck(this, CardRouter);

    var _this = _possibleConstructorReturn(this, (CardRouter.__proto__ || Object.getPrototypeOf(CardRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(CardRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      var upload = app.get('upload');
      //const config = app.get('config');
      //var upload = multer({ storage: config }).single('avatar')

      var temp = app.get('temp');
      var storage = app.get('storage');
      _mongoose2.default.connect('mongodb://localhost/mlang');
      var db = _mongoose2.default.connection;

      app.post('/card/update', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var list, err, card, _updatedCards, i, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  list = req.body.data.cards;

                  console.log(list);
                  err = void 0, card = void 0;
                  _updatedCards = [];
                  i = 0;

                case 5:
                  if (!(i < list.length)) {
                    _context.next = 19;
                    break;
                  }

                  _context.next = 8;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: list[i] }, { $set: {
                      grade: list[i].grade,
                      comment: list[i].comment,
                      audioComment: list[i].audioComment
                    } }, { new: true }));

                case 8:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  card = _ref3[1];

                  if (!(err || card === null)) {
                    _context.next = 15;
                    break;
                  }

                  console.log('no such card!');return _context.abrupt('return', res.json({ result: 'failed' }));

                case 15:
                  _updatedCards.splice(0, 0, card);

                case 16:
                  i++;
                  _context.next = 5;
                  break;

                case 19:
                  return _context.abrupt('return', res.json({
                    result: 'success',
                    updatedCards: _updatedCards
                  }));

                case 20:
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

      app.post('/card/getMultiple', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var list, err, card, langs, profile, _cards, _studentProfiles, i, _ref5, _ref6, _ref7, _ref8, _langs, j, _ref9, _ref10;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  list = req.body.data.cards;
                  //console.log(list);

                  err = void 0, card = void 0, langs = void 0, profile = void 0;
                  _cards = [];
                  _studentProfiles = [];
                  i = 0;

                case 5:
                  if (!(i < list.length)) {
                    _context2.next = 28;
                    break;
                  }

                  _context2.next = 8;
                  return (0, _to2.default)(_Card2.default.findById(list[i]));

                case 8:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  err = _ref6[0];
                  card = _ref6[1];

                  if (!(err || card === null)) {
                    _context2.next = 15;
                    break;
                  }

                  console.log('no such card!');return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 15:
                  _cards.splice(0, 0, card);

                  _context2.next = 18;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: card.author }));

                case 18:
                  _ref7 = _context2.sent;
                  _ref8 = _slicedToArray(_ref7, 2);
                  err = _ref8[0];
                  profile = _ref8[1];

                  if (!(err || profile === null)) {
                    _context2.next = 24;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 24:
                  _studentProfiles.splice(0, 0, profile);

                case 25:
                  i++;
                  _context2.next = 5;
                  break;

                case 28:
                  _langs = [];
                  j = 0;

                case 30:
                  if (!(j < _cards.length)) {
                    _context2.next = 44;
                    break;
                  }

                  _context2.next = 33;
                  return (0, _to2.default)(_Lang2.default.find({ card: list[j] }));

                case 33:
                  _ref9 = _context2.sent;
                  _ref10 = _slicedToArray(_ref9, 2);
                  err = _ref10[0];
                  langs = _ref10[1];

                  if (!(err || langs === null || langs.length === 0)) {
                    _context2.next = 40;
                    break;
                  }

                  console.log('card hv no lang!');return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 40:
                  _langs = [].concat(_toConsumableArray(_langs), _toConsumableArray(langs));

                case 41:
                  j++;
                  _context2.next = 30;
                  break;

                case 44:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    cards: _cards,
                    langs: _langs,
                    students: _studentProfiles
                  }));

                case 45:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.post('/card/add', function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var data, card, langs, err, _studentProject, _project, createdCard, createdLang, _ref12, _ref13, createdLangs, createdLangsId, i, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  card = data.card;
                  langs = data.langs;
                  err = void 0, _studentProject = void 0, _project = void 0, createdCard = void 0, createdLang = void 0;

                  /*if(card.studentProject.project === undefined){
                    console.log('new student project')
                    [err, _studentProject] = await to(StudentProject.create({project: data.project, student: card.author}));
                    if(err || _studentProject === null){ return res.json({ result: "failed" });}
                    card.studentProject = _studentProject;
                      [err, _project] = await to(Project.findOneAndUpdate({_id: data.project._id}, { $push:{
                      studentProjects: _studentProject._id
                    }}, {new: true}));
                    if(err || _project === null){ return res.json({ result: "failed" });}
                    console.log(_project)
                  }*/

                  _context3.next = 6;
                  return (0, _to2.default)(_Card2.default.create(card));

                case 6:
                  _ref12 = _context3.sent;
                  _ref13 = _slicedToArray(_ref12, 2);
                  err = _ref13[0];
                  createdCard = _ref13[1];

                  if (!(err || createdCard === null)) {
                    _context3.next = 12;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 12:
                  createdLangs = [];
                  createdLangsId = [];
                  i = 0;

                case 15:
                  if (!(i < langs.length)) {
                    _context3.next = 30;
                    break;
                  }

                  langs[i].card = createdCard._id;
                  _context3.next = 19;
                  return (0, _to2.default)(_Lang2.default.create(langs[i]));

                case 19:
                  _ref14 = _context3.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  createdLang = _ref15[1];

                  if (!(err || createdLang === null)) {
                    _context3.next = 25;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 25:
                  createdLangs.splice(0, 0, createdLang);
                  createdLangsId.splice(0, 0, createdLang._id);

                case 27:
                  i++;
                  _context3.next = 15;
                  break;

                case 30:
                  _context3.next = 32;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: createdCard._id }, { $set: {
                      langs: createdLangsId
                    } }, { new: true }));

                case 32:
                  _ref16 = _context3.sent;
                  _ref17 = _slicedToArray(_ref16, 2);
                  err = _ref17[0];
                  createdCard = _ref17[1];

                  if (!(err || createdCard === null)) {
                    _context3.next = 38;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 38:
                  _context3.next = 40;
                  return (0, _to2.default)(_StudentProject2.default.findOneAndUpdate({ _id: card.studentProject._id }, { $push: {
                      cards: createdCard._id
                    } }, { new: true }));

                case 40:
                  _ref18 = _context3.sent;
                  _ref19 = _slicedToArray(_ref18, 2);
                  err = _ref19[0];
                  _studentProject = _ref19[1];

                  if (!(err || createdCard === null)) {
                    _context3.next = 46;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 46:

                  res.json({
                    result: 'success',
                    card: createdCard,
                    langs: createdLangs,
                    updatedStudentProject: _studentProject
                  });

                case 47:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x5, _x6, _x7) {
          return _ref11.apply(this, arguments);
        };
      }());
    }
  }]);

  return CardRouter;
}(_Router3.default);

exports.default = CardRouter;
//# sourceMappingURL=card.js.map