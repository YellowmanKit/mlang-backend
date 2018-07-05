var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({
    createdAt: {
      type: Date,
      default: new Date()
    }
});

var Record = module.exports = mongoose.model('record',recordSchema);

module.exports.createRecord = ()=>{
  var record = {
    createdAt: new Date()
  };
  Record.create(record,()=>{});
  return record;
}
