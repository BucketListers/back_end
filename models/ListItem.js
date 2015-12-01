'use strict';

var mongoose = require('mongoose');


var listItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    required: true
  },
  target_date: {
    type: Date,
    match: /\d{4}-\d{2}-\d{2}/
  },
  location: {
    address: {
      type: String,
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    required: true
  }
}, {
  timestamps: true
});

//model
var ListItem = mongoose.model('List Item', listItemSchema);

module.exports = listItemSchema;
