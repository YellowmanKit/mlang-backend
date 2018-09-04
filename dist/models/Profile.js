'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var profileSchema = _mongoose2.default.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  joinedSchools: [ObjectId],
  joinedCourses: [ObjectId],

  cardCount: {
    type: Number,
    default: 0
  },
  featuredCount: {
    type: Number,
    default: 0
  }
});

var Profile = module.exports = _mongoose2.default.model('profile', profileSchema);
//# sourceMappingURL=Profile.js.map