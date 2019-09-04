'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Model = require('../Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _School = require('../School');

var _School2 = _interopRequireDefault(_School);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var publishSchema = _mongoose2.default.Schema({
  title: {
    type: String
  },
  questionnaire: {
    type: ObjectId
  },
  school: {
    type: ObjectId
  },
  submits: [ObjectId],

  createdAt: {
    type: Date
  },
  endDate: {
    type: Date
  },
  author: {
    type: ObjectId
  }
});

var Publish = module.exports = _mongoose2.default.model('publish', publishSchema);

module.exports.getAssigned = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(profile) {
    var err, publishes, publishesId, _ref2, _ref3, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            publishesId = [];
            _context.next = 3;
            return (0, _to2.default)(Publish.find({ school: { $in: profile.joinedSchools }, endDate: { $gt: new Date() } }));

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            publishes = _ref3[1];


            for (i = 0; i < publishes.length; i++) {
              publishesId = [].concat(_toConsumableArray(publishesId), [publishes[i]._id]);
            }

            return _context.abrupt('return', [err, publishes, publishesId]);

          case 9:
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
    var err, publishes, publishesId, _ref5, _ref6, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            publishesId = [];
            _context2.next = 3;
            return (0, _to2.default)(Publish.find({ author: userId }));

          case 3:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            publishes = _ref6[1];


            for (i = 0; i < publishes.length; i++) {
              publishesId.push(publishes[i]._id);
            }

            return _context2.abrupt('return', [err, publishes, publishesId]);

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
    var err, school, publish, _ref8, _ref9, _ref10, _ref11;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _to2.default)(_School2.default.findOne({ code: data.schoolCode }));

          case 2:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            school = _ref9[1];

            if (school) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt('return', ['Invalid school code!', null]);

          case 8:
            _context3.next = 10;
            return (0, _to2.default)(Publish.findOneAndUpdate({ _id: data.publish._id }, { $set: { title: data.title, questionnaire: data.questionnaire, school: school._id,
                endDate: data.endDate, author: data.author } }, { new: true }));

          case 10:
            _ref10 = _context3.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            err = _ref11[0];
            publish = _ref11[1];
            return _context3.abrupt('return', [err, publish]);

          case 15:
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
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
    var err, school, publish, _ref13, _ref14, _ref15, _ref16;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _to2.default)(_School2.default.findOne({ code: data.schoolCode }));

          case 2:
            _ref13 = _context4.sent;
            _ref14 = _slicedToArray(_ref13, 2);
            err = _ref14[0];
            school = _ref14[1];

            if (school) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', ['Invalid school code!', null]);

          case 8:
            _context4.next = 10;
            return (0, _to2.default)(Publish.create({
              title: data.title, questionnaire: data.questionnaire, school: school._id,
              endDate: data.endDate, author: data.author, createdAt: new Date() }));

          case 10:
            _ref15 = _context4.sent;
            _ref16 = _slicedToArray(_ref15, 2);
            err = _ref16[0];
            publish = _ref16[1];
            return _context4.abrupt('return', [err, publish, school]);

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref12.apply(this, arguments);
  };
}();
//# sourceMappingURL=Publish.js.map