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

var _node = require('parse/node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_node2.default.initialize(process.env.PARSE_APP_ID, process.env.DOTNET_KEY);
_node2.default.serverURL = process.env.PARSE_SERVER;

var mlanghkuRouter = function (_Router) {
  _inherits(mlanghkuRouter, _Router);

  function mlanghkuRouter(app) {
    _classCallCheck(this, mlanghkuRouter);

    var _this = _possibleConstructorReturn(this, (mlanghkuRouter.__proto__ || Object.getPrototypeOf(mlanghkuRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(mlanghkuRouter, [{
    key: 'init',
    value: function init() {
      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/mlang');
      var db = _mongoose2.default.connection;

      _node2.default.initialize(process.env.PARSE_APP_ID);
      _node2.default.serverURL = process.env.PARSE_SERVER;

      /*app.post('/mlanghku/fetchUser', async(req, res, next)=>{
        const data = req.body.data;
        console.log(data);
        res.json({
          result: 'success'
        })
      });*/
    }
  }, {
    key: 'login',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, pw) {
        var err, user, _ref2, _ref3;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                err = void 0, user = void 0;
                _context.next = 3;
                return (0, _to2.default)(_node2.default.User.logIn(id, pw));

              case 3:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                err = _ref3[0];
                user = _ref3[1];

                if (!err) {
                  _context.next = 10;
                  break;
                }

                console.log(err.message);return _context.abrupt('return', ['error']);

              case 10:
                return _context.abrupt('return', [null, user]);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return mlanghkuRouter;
}(_Router3.default);

exports.default = mlanghkuRouter;
//# sourceMappingURL=mlanghku.js.map