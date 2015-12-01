'use strict';


var ListItem = require('../models').model('ListItem');

var ctrl = {

    root : {
        get : function(req, res) {
            res.json(req.session);
        },
        'default' : function(err, req, res) {
            res.status(500).
                json({
                    error : {
                        name : err.name,
                        message : err.message
                    }
                });
        },
        middleware : [
            function(req, res, next) {
                if(req.session) {
                    if(req.session.currRequestRoute) {
                        req.session.lastRequestRoute = req.session.currRequestRoute;
                    }

                    req.session.currRequestRoute = req.path;
                }

                next();
            }
        ]
    },


    showList : function(req, res) {
        if(!req.user) {
            var err = new Error("Not Authorized!");
            return next(err);
        }
        console.log(req.user.list);
        res.json({
            title : (req.user.list) || 'No List.'
        });

    },

    createItem : function(req, res, next) {
        if(!req.body || !req.user || !req.body.name || !req.body.city) {
            var err = new Error("No content!");
            return next(err);
        }

        var pListItem = new Promise(function(resolve, reject) {
            ListItem.create({
                name : req.body.name,
                city : req.body.city
            }, function(err, listItem) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(listItem);
            });
        });

        pListItem.then(function(listItem){
          req.user.list.push(listItem);
          req.user.save();
        }).then(function() {
            res.sendStatus(200);
        }).catch(function(err) {
            next(err);
        });
    },
// *************************** BROKEN ***************************
    updateItem : function(req, res, next) {
        // check that user is logged in
        // check that body contains a password value
        if(!req.body || !req.user || !req.body.name && !req.body.city) {
            var err = new Error("No update supplied.");
            return next(err);
        }
        var pUpdate = new Promise(function(resolve, reject) {
            ListItem.findByIdAndUpdate(

                //THIS IS WHAT IS USED BY FIND AND UPDATE
                id,
                [update],
                [options],
                [callback]
            );
                 if(err) {
                    reject(err);
                    return;
                }
                resolve(item);

        });

        pUpdate.then(function(listItem){
          req.user.list.push(listItem);
          req.user.save();
        }).then(function() {
            res.sendStatus(200);
        }).catch(function(err) {
            next(err);
        });
    },
// *************************** BROKEN ***************************
    destroyItem : function(req, res) {
        ListItem.findByIdAndRemove(
            // THIS IS WHAT IS USED BY FIND AND REMOVE
            id,
            [options],
            [callback]
        )

        res.json({
            title : 'item deleted'
        });
    }
};

module.exports = ctrl;
