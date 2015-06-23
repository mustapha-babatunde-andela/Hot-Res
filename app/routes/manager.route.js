var express = require('express');
var Managers = require('../controllers/manager.controller');
var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');
var verifyToken = require('../../config/tokenMiddleware');

//configure routes

module.exports = function(router){

  router.route('/managers')
    .get(Managers.getManagers)
    .post(Managers.addManager);

  router.route('/managers/:id')
    .get(Managers.getSingleManager)
    .put(verifyToken, Managers.editManager)
    .delete(verifyToken, Managers.deleteManager);

  router.route('/managers/login')
    .post(Managers.managerLogin);
};
