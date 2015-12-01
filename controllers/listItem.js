'use strict';

var ListItem = require('../models').model('ListItem');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    readList : {
        get : function(req, res) {
            res.json({
                title : (req.user && req.user.list) || 'Nothing here'
            });
        }
    },
    create : {
        post : function(req, res, next) {
            if(!req.body || !req.user || !req.body.name || !req.body.category || !req.body.completed || !req.body.location) {
                var err = new Error("No content!");
                return next(err);
            }

            var pListItem = new Promise(function(res, rej) {
                ListItem.create({
                    name : req.body.name,
                    category : req.body.category,
                    completed : req.body.completed,
                    location : req.body.location
                }, function(err, listItem) {
                    if(err) {
                        rej(err);
                        return;
                    }

                    res(listItem);
                });
            });
            pListItem.then(function() {
                res.sendStatus(200);
            }).catch(function(err) {
                next(err);
            });
        }
    },
    update : {
        patch : function(req, res, next) {
            // check that user is logged in
            // check that body contains a password value
            if(!req.body && !req.user && !req.body.name && !req.body.category && !req.body.completed && !req.body.target_date && !req.body.description && !req.body.location) {
                var err = new Error("No information supplied.");
                return next(err);
            }
            // bcrypt the password
            req.user.setPassword(req.body.password).
                then(function() {
                    res.sendStatus(200);
                }).catch(function(err) {
                    next(err);
                });
        }
    }
};
