'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var cardSchema = _mongoose2.default.Schema({
  studentProject: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  audioComment: {
    type: String
  },
  grade: {
    type: String,
    default: 'notGraded'
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  langs: [ObjectId]
});

var Card = module.exports = _mongoose2.default.model('card', cardSchema);
//# sourceMappingURL=Card.js.map