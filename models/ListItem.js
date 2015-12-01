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
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  target_date: {
    type: Date,
    required: true,
    match: /\d{4}-\d{2}-\d{2}/
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    }
  }
}, {
  timestamps: true
});

//model
var ListItem = mongoose.model('List Item', listItemSchema);

module.exports = listItemSchema;
