import mongoose from 'mongoose';
import randomString from'randomstring';
import to from'../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var courseSchema = mongoose.Schema({
  teacher: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String
  }

});

var Course = module.exports = mongoose.model('course',courseSchema);

module.exports.addCourse = async (newCourse, cb)=>{
  let err, course;

  var newCode = '';
  for(var i=0;i<99;i++){
    newCode = randomString.generate(6);

    [err,course] = await to(Course.findOne({code: newCode}));
    if(!err && course === null){ break; };
  }

  newCourse['code'] = newCode;

  [err, course] = await to(Course.create(newCourse));
  if(err){ cb('failed'); console.log(err); return; }

  //console.log(course)
  cb('success', course)
}
