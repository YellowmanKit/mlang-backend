'use strict';
require("babel-core/register");
require("babel-polyfill");
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createapp = require('./main/createapp.js');

var _createapp2 = _interopRequireDefault(_createapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _createapp2.default('mlang', 3000);
exports.default = app;
//# sourceMappingURL=index.js.map
