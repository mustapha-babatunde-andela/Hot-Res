// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
var stateSchema = new Schema({
    state: { type: String, required: true },
    count: { type: Number }
});

module.exports = mongoose.model('State', stateSchema);