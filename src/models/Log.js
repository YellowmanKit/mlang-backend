import mongoose from 'mongoose';
import to from'../to';
import Model from './Model';

var ObjectId = mongoose.Schema.Types.ObjectId;
var logSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  }
})

var Log = module.exports = mongoose.model('log', logSchema);

module.exports.getMultipleByProfiles = async (profiles)=>{
  var err, data;
  var users = [];
  for(var i=0;i<profiles.length;i++){
    users = [...users, profiles[i].belongTo];
  }
  [err, data] = await to(Log.find({ user: { $in: users } }));
  return [err, data];
}

module.exports.createLoginLog = async (userId)=>{
  var err, log;
  [err, log] = await to(Log.findOne({ user: userId , type: 'login' }, null, {sort: {createdAt: -1 }}));
  if(err){ return; }
  if(log){ if(Model.deltaMinute(new Date(), log.createdAt) < 60){ return; } }
  Log.create({type: 'login', user: userId, createdAt: new Date()});
}
