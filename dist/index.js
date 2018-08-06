'use strict';
require("babel-core/register");
require("babel-polyfill");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createApp = require('./main/createApp.js');

var _createApp2 = _interopRequireDefault(_createApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _createApp2.default('mlang', 443);
exports.default = app;
//# sourceMappingURL=index.js.map
