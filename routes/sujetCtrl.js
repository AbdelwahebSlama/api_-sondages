// Imports
var user = require('../models/user');
var sujet = require('../models/sujet');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib = require('async');
// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;
// Routes
module.exports = {

    createSujet: async (req, res, next) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        // Params
        var titre = req.body.titre;
        var description = req.body.description;
        if (titre == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }
        if (description == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }
        asyncLib.waterfall([
            function (done) {
                user.findOne(
                    {_id: userId})
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'unable to verify user'});
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    sujet.create({
                        titre: titre,
                        description: description,
                        choix: 'non',
                        userId: userFound.id
                    })
                        .then(function (newSujet) {
                            done(newSujet);
                        });
                } else {
                    res.status(404).json({'error': 'user not found'});
                }
            },
        ], function (newSujet) {
            if (newSujet) {
                return res.status(201).json(newSujet);
            } else {
                return res.status(500).json({'error': 'cannot create sujet'});
            }
        });
    }
    // listSujet: async (req, res, next) =>{
    //     var fields  = req.query.fields;
    //     var limit   = parseInt(req.query.limit);
    //     var offset  = parseInt(req.query.offset);
    //     var order   = req.query.order;
    //
    //     if (limit > ITEMS_LIMIT) {
    //         limit = ITEMS_LIMIT;
    //     }
    //
    //     sujet.find({},null,{
    //         order: [(order != null) ? order.split(':') : ['libelle', 'ASC']],
    //         attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    //         limit: (!isNaN(limit)) ? limit : null,
    //         offset: (!isNaN(offset)) ? offset : null,
    //         include: [{
    //             model: user,
    //             attributes: [ 'name' ]
    //         }]
    //     }).then(function(listsujet) {
    //         if (listsujet) {
    //             res.status(200).json(listsujet);
    //         } else {
    //             res.status(404).json({ "error": "no messages found" });
    //         }
    //     }).catch(function(err) {
    //         console.log(err);
    //         res.status(500).json({ "error": "invalid fields" });
    //     });
    // }

}