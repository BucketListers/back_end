'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('ListItem', require('./ListItem'));

mongoose.connect(process.env.MONGOLAB_URI);

module.exports = mongoose;
