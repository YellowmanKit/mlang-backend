'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _School = require('./School');

var _School2 = _interopRequireDefault(_School);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

module.exports.getProfilesByUsers = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(users) {
    var err, data, profile, profiles, profilesId, i, _ref2, _ref3, supervisingSchools, _ref4, _ref5;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, data = void 0;
            profile = [];
            profiles = [];
            profilesId = [];
            i = 0;

          case 5:
            if (!(i < users.length)) {
              _context.next = 27;
              break;
            }

            _context.next = 8;
            return (0, _to2.default)(_Profile2.default.findOne({ belongTo: users[i]._id }));

          case 8:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            profile = _ref3[1];

            if (!(users[i].type === 'admin')) {
              _context.next = 22;
              break;
            }

            supervisingSchools = [];
            _context.next = 16;
            return _School2.default.getByUser(users[i], profile);

          case 16:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 3);
            err = _ref5[0];
            data = _ref5[1];
            supervisingSchools = _ref5[2];

            profile = _extends({}, profile._doc, { supervisingSchools: supervisingSchools });

          case 22:
            profiles = [].concat(_toConsumableArray(profiles), [profile]);
            profilesId = [].concat(_toConsumableArray(profilesId), [profile._id]);

          case 24:
            i++;
            _context.next = 5;
            break;

          case 27:
            return _context.abrupt('return', [err, profiles, profilesId]);

          case 28:
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

module.exports.getByType = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type) {
    var err, users, usersId, _ref7, _ref8, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, users = void 0;
            usersId = [];
            _context2.next = 4;
            return (0, _to2.default)(User.find({ type: type }));

          case 4:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            err = _ref8[0];
            users = _ref8[1];

            if (!(err || !users)) {
              _context2.next = 11;
              break;
            }

            console.log(err);return _context2.abrupt('return', ['error']);

          case 11:
            for (i = 0; i < users.length; i++) {
              usersId = [].concat(_toConsumableArray(usersId), [users[i]._id]);
            }
            return _context2.abrupt('return', [null, users, usersId]);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports.getUserAndProfile = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, pw) {
    var err, user, profile, _ref10, _ref11, _ref12, _ref13;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0, user = void 0, profile = void 0;
            _context3.next = 3;
            return (0, _to2.default)(User.findOne({ id: id, pw: pw }));

          case 3:
            _ref10 = _context3.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            err = _ref11[0];
            user = _ref11[1];

            if (!(err || !user)) {
              _context3.next = 10;
              break;
            }

            console.log(err);return _context3.abrupt('return', ['error']);

          case 10:
            _context3.next = 12;
            return (0, _to2.default)(_Profile2.default.findOne({ belongTo: user._id }));

          case 12:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            profile = _ref13[1];

            if (!(err || !profile)) {
              _context3.next = 19;
              break;
            }

            console.log(err);return _context3.abrupt('return', ['error']);

          case 19:
            return _context3.abrupt('return', [null, user, profile]);

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3, _x4) {
    return _ref9.apply(this, arguments);
  };
}();

module.exports.resetPassword = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_email, cb) {
    var err, user, info, _ref15, _ref16, randomPassword, mailOptions, _ref17, _ref18;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            err = void 0, user = void 0, info = void 0;
            _context4.next = 3;
            return (0, _to2.default)(User.findOne({ email: _email }));

          case 3:
            _ref15 = _context4.sent;
            _ref16 = _slicedToArray(_ref15, 2);
            err = _ref16[0];
            user = _ref16[1];

            if (!(err || user === null)) {
              _context4.next = 10;
              break;
            }

            cb('failed');return _context4.abrupt('return');

          case 10:
            ;

            randomPassword = _randomstring2.default.generate(6);
            mailOptions = {
              from: process.env.EMAIL_ID,
              to: _email,
              subject: 'Your mlang account password has been reset!',
              html: '<p>Dear user,</p>' + '<p>Thanks for using mlang!</p>' + '<p>Your account id is ' + user.id + '</p>' + '<p>and your new password is <b>' + randomPassword + '</b>.</p>' + '<p>Have fun!</p>' + '<p>Regard,</p>' + '<p>mlang developer team</p>' + '<p>For any suggestions or bug report please send email to mlang.socail@gmail.com</p>'
            };
            _context4.next = 15;
            return (0, _to2.default)(transporter.sendMail(mailOptions));

          case 15:
            _ref17 = _context4.sent;
            _ref18 = _slicedToArray(_ref17, 2);
            err = _ref18[0];
            info = _ref18[1];

            if (!err) {
              _context4.next = 23;
              break;
            }

            cb('failed');console.log('err: mail cannot be sent');return _context4.abrupt('return');

          case 23:

            user.set({ pw: randomPassword });
            user.save();
            cb('success');

          case 26:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x5, _x6) {
    return _ref14.apply(this, arguments);
  };
}();

module.exports.acquireNewAccount = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_email, cb) {
    var existUser, randomPassword, defaultId, newUser, mailOptions, err, info, user, profile, _ref20, _ref21, _ref22, _ref23, newProfile, _ref24, _ref25;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return User.findOne({ email: _email });

          case 2:
            existUser = _context5.sent;

            if (!(existUser !== null)) {
              _context5.next = 6;
              break;
            }

            cb('failed');return _context5.abrupt('return');

          case 6:
            randomPassword = _randomstring2.default.generate({
              length: 6,
              charset: 'abcdefghjkmnopqrstuvwxyz1234567890'
            });
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
              html: '<p>Dear user,</p>' + '<p>Thanks for using mlang!</p>' + '<p>Your account id is ' + newUser.id + '</p>' + '<p>and your password is <b>' + randomPassword + '</b></p>' + '<p>Have fun!</p>' + '<p>Regard,</p>' + '<p>mlang developer team</p>' + '<p>For any suggestions or bug report please send email to mlang.socail@gmail.com</p>'
            };
            err = void 0, info = void 0, user = void 0, profile = void 0;
            _context5.next = 13;
            return (0, _to2.default)(transporter.sendMail(mailOptions));

          case 13:
            _ref20 = _context5.sent;
            _ref21 = _slicedToArray(_ref20, 2);
            err = _ref21[0];
            info = _ref21[1];

            if (!err) {
              _context5.next = 22;
              break;
            }

            cb('failed');console.log(err);console.log('err: mail cannot be sent');return _context5.abrupt('return');

          case 22:
            _context5.next = 24;
            return (0, _to2.default)(User.create(newUser));

          case 24:
            _ref22 = _context5.sent;
            _ref23 = _slicedToArray(_ref22, 2);
            err = _ref23[0];
            user = _ref23[1];

            if (!err) {
              _context5.next = 32;
              break;
            }

            cb('failed');console.log(err);return _context5.abrupt('return');

          case 32:
            newProfile = {
              belongTo: user._id
            };
            _context5.next = 35;
            return (0, _to2.default)(_Profile2.default.create(newProfile));

          case 35:
            _ref24 = _context5.sent;
            _ref25 = _slicedToArray(_ref24, 2);
            err = _ref25[0];
            profile = _ref25[1];

            if (!err) {
              _context5.next = 43;
              break;
            }

            cb('failed');console.log(err);return _context5.abrupt('return');

          case 43:
            cb('success');

          case 44:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x7, _x8) {
    return _ref19.apply(this, arguments);
  };
}();

//console.log(process.env.GMAIL_ID);
//console.log(process.env.GMAIL_PW);

var transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PW
  }
});

/*const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    //requireTLS: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW
    }
});*/
//# sourceMappingURL=User.js.map