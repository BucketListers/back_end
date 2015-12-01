'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('ListItem', require('./ListItem'));

mongoose.connect("mongodb://localhost/bucket_list");

module.exports = mongoose;
