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

var _Course = require('./Course');

var _Course2 = _interopRequireDefault(_Course);

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
  mlanghkuId: {
    type: String
  },
  mlanghkuPw: {
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
    type: Date
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
              _context3.next = 9;
              break;
            }

            return _context3.abrupt('return', ['error']);

          case 9:
            _context3.next = 11;
            return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: user._id }, { $set: { lastLogin: new Date() } }));

          case 11:
            _ref12 = _context3.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            err = _ref13[0];
            profile = _ref13[1];

            if (!(err || !profile)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt('return', ['error']);

          case 17:
            return _context3.abrupt('return', [null, user, profile]);

          case 18:
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
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(email, cb) {
    var err, user, info, _ref15, _ref16, randomPassword, mailOptions, _ref17, _ref18;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            err = void 0, user = void 0, info = void 0;
            _context4.next = 3;
            return (0, _to2.default)(User.findOne({ email: email }));

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
              to: email,
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

module.exports.aquireNewAccountByAppAccount = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(appUser, appPw) {
    var existUser, err, user, profile, newUser, _ref20, _ref21, newProfile, _ref22, _ref23;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return User.findOne({ id: appUser.username, pw: appPw });

          case 2:
            existUser = _context5.sent;

            if (!(existUser !== null)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', ['error']);

          case 5:
            err = void 0, user = void 0, profile = void 0;
            newUser = {
              id: appUser.username,
              pw: appPw,
              mlanghkuId: appUser.username,
              mlanghkuPw: appPw,
              email: appUser.email,
              type: appUser.identity === 2 ? 'teacher' : 'student',
              createdAt: new Date()
            };
            _context5.next = 9;
            return (0, _to2.default)(User.create(newUser));

          case 9:
            _ref20 = _context5.sent;
            _ref21 = _slicedToArray(_ref20, 2);
            err = _ref21[0];
            user = _ref21[1];

            if (!err) {
              _context5.next = 16;
              break;
            }

            console.log('cant create user');return _context5.abrupt('return', ['error']);

          case 16:
            newProfile = {
              belongTo: user._id
            };
            _context5.next = 19;
            return (0, _to2.default)(_Profile2.default.create(newProfile));

          case 19:
            _ref22 = _context5.sent;
            _ref23 = _slicedToArray(_ref22, 2);
            err = _ref23[0];
            profile = _ref23[1];

            if (!err) {
              _context5.next = 26;
              break;
            }

            console.log('cant create profile');return _context5.abrupt('return', ['error']);

          case 26:
            return _context5.abrupt('return', [null, user, profile]);

          case 27:
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

module.exports.acquireNewAccountByCode = function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(code, codeType) {
    var err, exist, user, profile, course, teacher, school, _ref25, _ref26, _ref27, _ref28, newUser, _ref29, _ref30, newProfile, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref40, _ref41, _ref42, _ref43, _ref44;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            err = void 0, exist = void 0, user = void 0, profile = void 0, course = void 0, teacher = void 0, school = void 0;

            if (!(codeType === 'course')) {
              _context6.next = 10;
              break;
            }

            _context6.next = 4;
            return (0, _to2.default)(_Course2.default.codeExist(code));

          case 4:
            _ref25 = _context6.sent;
            _ref26 = _slicedToArray(_ref25, 2);
            err = _ref26[0];
            exist = _ref26[1];
            _context6.next = 16;
            break;

          case 10:
            _context6.next = 12;
            return (0, _to2.default)(_School2.default.codeExist(code));

          case 12:
            _ref27 = _context6.sent;
            _ref28 = _slicedToArray(_ref27, 2);
            err = _ref28[0];
            exist = _ref28[1];

          case 16:
            if (!(err || !exist)) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt('return', ['failed - invalid code']);

          case 18:
            newUser = {
              id: 'DefaultId',
              pw: randomPassword(),
              email: '@',
              type: codeType === 'course' ? 'student' : 'teacher',
              createdAt: new Date()
            };
            _context6.next = 21;
            return (0, _to2.default)(User.create(newUser));

          case 21:
            _ref29 = _context6.sent;
            _ref30 = _slicedToArray(_ref29, 2);
            err = _ref30[0];
            user = _ref30[1];
            newProfile = { belongTo: user._id };
            _context6.next = 28;
            return (0, _to2.default)(_Profile2.default.create(newProfile));

          case 28:
            _ref31 = _context6.sent;
            _ref32 = _slicedToArray(_ref31, 2);
            err = _ref32[0];
            profile = _ref32[1];

            if (!(codeType === 'course')) {
              _context6.next = 65;
              break;
            }

            _context6.next = 35;
            return _Course2.default.joinCourse({ userId: user._id, code: code });

          case 35:
            _ref33 = _context6.sent;
            _ref34 = _slicedToArray(_ref33, 2);
            err = _ref34[0];
            course = _ref34[1];
            _context6.next = 41;
            return (0, _to2.default)(User.findOne({ _id: course.teacher }));

          case 41:
            _ref35 = _context6.sent;
            _ref36 = _slicedToArray(_ref35, 2);
            err = _ref36[0];
            teacher = _ref36[1];
            _context6.next = 47;
            return (0, _to2.default)(_Profile2.default.findOne({ belongTo: teacher._id }));

          case 47:
            _ref37 = _context6.sent;
            _ref38 = _slicedToArray(_ref37, 2);
            err = _ref38[0];
            profile = _ref38[1];
            _context6.next = 53;
            return (0, _to2.default)(_School2.default.findOne({ _id: profile.joinedSchools[0] }));

          case 53:
            _ref39 = _context6.sent;
            _ref40 = _slicedToArray(_ref39, 2);
            err = _ref40[0];
            school = _ref40[1];
            _context6.next = 59;
            return _School2.default.joinSchool({ user: user, code: school.code });

          case 59:
            _ref41 = _context6.sent;
            _ref42 = _slicedToArray(_ref41, 1);
            err = _ref42[0];
            return _context6.abrupt('return', [err, user]);

          case 65:
            if (!(codeType === 'school')) {
              _context6.next = 72;
              break;
            }

            _context6.next = 68;
            return _School2.default.joinSchool({ user: user, code: code });

          case 68:
            _ref43 = _context6.sent;
            _ref44 = _slicedToArray(_ref43, 1);
            err = _ref44[0];
            return _context6.abrupt('return', [err, user]);

          case 72:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x9, _x10) {
    return _ref24.apply(this, arguments);
  };
}();

module.exports.acquireNewAccount = function () {
  var _ref45 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(email, cb) {
    var existUser, defaultId, newUser, mailOptions, err, info, user, profile, _ref46, _ref47, _ref48, _ref49, newProfile, _ref50, _ref51;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return User.findOne({ email: email });

          case 2:
            existUser = _context7.sent;

            if (!(existUser !== null)) {
              _context7.next = 6;
              break;
            }

            cb('failed');return _context7.abrupt('return');

          case 6:
            defaultId = email.substring(0, email.lastIndexOf("@"));
            newUser = {
              id: defaultId,
              pw: randomPassword(),
              email: email
            };
            mailOptions = {
              from: process.env.EMAIL_ID,
              to: email,
              subject: 'Your mlang account is ready!',
              html: '<p>Dear user,</p>' + '<p>Thanks for using mlang!</p>' + '<p>Your account id is ' + newUser.id + '</p>' + '<p>and your password is <b>' + randomPassword + '</b></p>' + '<p>Have fun!</p>' + '<p>Regard,</p>' + '<p>mlang developer team</p>' + '<p>For any suggestions or bug report please send email to mlang.socail@gmail.com</p>'
            };
            err = void 0, info = void 0, user = void 0, profile = void 0;
            _context7.next = 12;
            return (0, _to2.default)(transporter.sendMail(mailOptions));

          case 12:
            _ref46 = _context7.sent;
            _ref47 = _slicedToArray(_ref46, 2);
            err = _ref47[0];
            info = _ref47[1];

            if (!err) {
              _context7.next = 21;
              break;
            }

            cb('failed');console.log(err);console.log('err: mail cannot be sent');return _context7.abrupt('return');

          case 21:
            _context7.next = 23;
            return (0, _to2.default)(User.create(newUser));

          case 23:
            _ref48 = _context7.sent;
            _ref49 = _slicedToArray(_ref48, 2);
            err = _ref49[0];
            user = _ref49[1];

            if (!err) {
              _context7.next = 31;
              break;
            }

            cb('failed');console.log(err);return _context7.abrupt('return');

          case 31:
            newProfile = {
              belongTo: user._id
            };
            _context7.next = 34;
            return (0, _to2.default)(_Profile2.default.create(newProfile));

          case 34:
            _ref50 = _context7.sent;
            _ref51 = _slicedToArray(_ref50, 2);
            err = _ref51[0];
            profile = _ref51[1];

            if (!err) {
              _context7.next = 42;
              break;
            }

            cb('failed');console.log(err);return _context7.abrupt('return');

          case 42:
            cb('success');

          case 43:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x11, _x12) {
    return _ref45.apply(this, arguments);
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

function randomPassword() {
  return _randomstring2.default.generate({
    length: 6,
    charset: 'abcdefghjkmnopqrstuvwxyz234567890'
  });
}

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