'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;


var User = require('../models').model('User');
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




    showList : function(req, res, next) {
        if(!req.user) {
            var err = new Error("Not Authorized!");
            return next(err);
        }

        User.findById(req.user._id).populate('list').exec().then(function(user){
            res.json(user.list);
        }).catch(function(err){
            next(err);
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
                }
            );
        });

        pListItem.then(function(listItem){
          req.user.list.push(listItem);
          req.user.save();
          return listItem;
        }).then(function(listItem) {
            res.json(listItem);
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
                req.params.id,
                {
                name : req.body.name,
                city : req.body.city
                }, {new: true},
                function(err, listItem){
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(listItem);
                }
            );
        });

        pUpdate.then(function(listItem){
          req.user.save();
          return listItem;
        }).then(function(listItem) {
            res.json(listItem);
        }).catch(function(err) {
            next(err);
        });
    },
    destroyItem : function(req, res) {
        ListItem.findByIdAndRemove( req.params.id, function(err, item){
            console.log("Deleted item id: " + req.params.id);
            res.sendStatus(200);
        });
    }

    // destroyReference : function(req, res) {
    //     ListItem.findByIdAndUpdate( req.user._id,{
    //     $pull: {List: [{req.params.id}]}
    // }, function(err, item){
    //         console.log("Deleted reference in userID: " + req.params.id);
    //         res.sendStatus(200);
    //     });
    // }

};

module.exports = ctrl;


// db.users.update( { _id: ObjectId('565e0904eb8f76255c362e68') }, { $pull: { list: [] } } );
