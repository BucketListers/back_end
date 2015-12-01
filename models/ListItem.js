'use script';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var listItemSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  city: {
    type : String,
    required : true
  }
});

module.exports = listItemSchema;

