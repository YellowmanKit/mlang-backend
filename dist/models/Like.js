'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var likeSchema = _mongoose2.default.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date
  }
});

var Like = module.exports = _mongoose2.default.model('like', likeSchema);

module.exports.card = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cardId, userId) {
    var err, like, card, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _to2.default)(Like.findOne({ card: cardId, user: userId }));

          case 2:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            like = _ref3[1];

            if (like) {
              _context.next = 15;
              break;
            }

            _context.next = 9;
            return (0, _to2.default)(Like.create({ card: cardId, user: userId, createdAt: new Date() }));

          case 9:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            like = _ref5[1];
            _context.next = 21;
            break;

          case 15:
            _context.next = 17;
            return (0, _to2.default)(Like.findOneAndUpdate({ _id: like._id }, { $set: { cancelled: !like.cancelled } }, { new: true }));

          case 17:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            err = _ref7[0];
            like = _ref7[1];

          case 21:
            _context.next = 23;
            return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: cardId }, { $inc: { likeCount: like.cancelled ? -1 : 1 } }, { new: true }));

          case 23:
            _ref8 = _context.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            card = _ref9[1];
            return _context.abrupt('return', [err, card, like]);

          case 28:
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
//# sourceMappingURL=Like.js.map