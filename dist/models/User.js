'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

var schema = _mongoose2.default.Schema({
  id: {
    type: String
  },
  pw: {
    type: String
  },
  email: {
    type: String
  },
  type: {
    type: String,
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var User = module.exports = _mongoose2.default.model('user', schema);

module.exports.resetPassword = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_email, cb) {
    var err, user, info, _ref2, _ref3, randomPassword, mailOptions, _ref4, _ref5;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, user = void 0, info = void 0;
            _context.next = 3;
            return (0, _to2.default)(User.findOne({ email: _email }));

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            user = _ref3[1];

            if (!(err || user === null)) {
              _context.next = 10;
              break;
            }

            cb('failed');return _context.abrupt('return');

          case 10:
            ;

            randomPassword = _randomstring2.default.generate(6);
            mailOptions = {
              from: process.env.EMAIL_ID,
              to: _email,
              subject: 'Your mlang account password has been reset!',
              html: '<p>Dear user,</p>' + '<p>Thanks for using mlang!</p>' + '<p>Your account id is ' + user.id + '</p>' + '<p>and your new password is <b>' + randomPassword + '</b></p>' + '<p>Have fun!</p>' + '<p>Regard,</p>' + '<p>mlang developer team</p>'
            };
            _context.next = 15;
            return (0, _to2.default)(transporter.sendMail(mailOptions));

          case 15:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            info = _ref5[1];

            if (!err) {
              _context.next = 23;
              break;
            }

            cb('failed');console.log('err: mail cannot be sent');return _context.abrupt('return');

          case 23:

            user.set({ pw: randomPassword });
            user.save();
            cb('success');

          case 26:
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

module.exports.acquireNewAccount = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_email, cb) {
    var existUser, randomPassword, defaultId, newUser, mailOptions, err, info, user, profile, _ref7, _ref8, _ref9, _ref10, newProfile, _ref11, _ref12;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({ email: _email });

          case 2:
            existUser = _context2.sent;

            if (!(existUser !== null)) {
              _context2.next = 6;
              break;
            }

            cb('failed');return _context2.abrupt('return');

          case 6:
            randomPassword = _randomstring2.default.generate(6);
            defaultId = _email.substring(0, _email.lastIndexOf("@"));
            newUser = {
              id: defaultId,
              pw: randomPassword,
              email: _email
            };
            mailOptions = {
              from: process.env.EMAIL_ID,
              to: _email,
              subject: 'Your mlang account is ready!',
              html: '<p>Dear user,</p>' + '<p>Thanks for using mlang!</p>' + '<p>Your account id is ' + newUser.id + '</p>' + '<p>and your password is <b>' + randomPassword + '</b></p>' + '<p>Have fun!</p>' + '<p>Regard,</p>' + '<p>mlang developer team</p>'
            };
            err = void 0, info = void 0, user = void 0, profile = void 0;
            _context2.next = 13;
            return (0, _to2.default)(transporter.sendMail(mailOptions));

          case 13:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            err = _ref8[0];
            info = _ref8[1];

            if (!err) {
              _context2.next = 21;
              break;
            }

            cb('failed');console.log('err: mail cannot be sent');return _context2.abrupt('return');

          case 21:
            _context2.next = 23;
            return (0, _to2.default)(User.create(newUser));

          case 23:
            _ref9 = _context2.sent;
            _ref10 = _slicedToArray(_ref9, 2);
            err = _ref10[0];
            user = _ref10[1];

            if (!err) {
              _context2.next = 31;
              break;
            }

            cb('failed');console.log(err);return _context2.abrupt('return');

          case 31:
            newProfile = {
              belongTo: user._id
            };
            _context2.next = 34;
            return (0, _to2.default)(_Profile2.default.create(newProfile));

          case 34:
            _ref11 = _context2.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            err = _ref12[0];
            profile = _ref12[1];

            if (!err) {
              _context2.next = 42;
              break;
            }

            cb('failed');console.log(err);return _context2.abrupt('return');

          case 42:
            cb('success');

          case 43:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

//console.log(process.env.EMAIL_ID);
//console.log(process.env.EMAIL_PW);
//console.log(process.env.HOST);

var transporter = _nodemailer2.default.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  //requireTLS: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW
  }
});
//# sourceMappingURL=User.js.map