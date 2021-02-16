var express = require('express');
var userCtrl = require('./routes/userCtrl');
var sujetCtrl = require('./routes/sujetCtrl');
//Routes
exports.router= (function(){
    var apiRouter = express.Router();

    //route user
    apiRouter.route('/users/registre/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);


    //route sujet
    apiRouter.route('/sujet/create/').post(sujetCtrl.createSujet);
    // apiRouter.route('/sujet/listeSujet/').get(sujetCtrl.listSujet);

    return apiRouter;

})();