'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var studentProjectSchema = _mongoose2.default.Schema({
  project: {
    type: ObjectId,
    required: true
  },
  student: {
    type: ObjectId,
    required: true
  },
  studentAlert: {
    type: Boolean,
    default: false
  },
  cards: [ObjectId]
});

var StudentProject = module.exports = _mongoose2.default.model('studentProject', studentProjectSchema);
//# sourceMappingURL=StudentProject.js.map