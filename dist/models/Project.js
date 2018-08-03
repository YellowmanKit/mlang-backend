'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var projectSchema = _mongoose2.default.Schema({
  course: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  studentProjects: [ObjectId]
});

var Project = module.exports = _mongoose2.default.model('project', projectSchema);
//# sourceMappingURL=Project.js.map