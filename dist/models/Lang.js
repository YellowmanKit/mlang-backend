'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var langSchema = _mongoose2.default.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  audio: {
    type: String
  }
});

var Lang = module.exports = _mongoose2.default.model('lang', langSchema);
//# sourceMappingURL=Lang.js.map