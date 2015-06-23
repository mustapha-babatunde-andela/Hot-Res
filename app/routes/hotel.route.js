// import express
var express = require('express');

/*  
    import the controller module that contains all
    functions to be called by the route
*/
var Hotels = require('../controllers/hotel.controller');
var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');
var verifyToken = require('../../config/tokenMiddleware');

  //configure routes
  module.exports = function(router){

  router.route('/hotels')
    .get(Hotels.getHotels)
    .post(Hotels.addHotel);

  router.route('/files')
    .post(Hotels.uploadImage);

  router.route('/hotels/:id')
    .put(verifyToken, Hotels.editHotel)
    .get(Hotels.getSingleHotel)
    .delete(verifyToken, Hotels.deleteHotel);

  router.route('/hotels/manager/:id')
    .get(verifyToken, Hotels.getManagerHotels);

  router.route('/hotels/reviews/:id')
    .post(Hotels.saveReview);
};