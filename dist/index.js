'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createApp = require('./main/createApp.js');

var _createApp2 = _interopRequireDefault(_createApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const app = new CreateApp('mlang', 443, true, true, false);
var app = new _createApp2.default('mlang', 3000, false, false, false);
exports.default = app;
//# sourceMappingURL=index.js.map