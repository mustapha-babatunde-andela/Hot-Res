// import express
var express = require('express');

/*  
    import the controller module that contains all
    functions to be called by the route
*/
var Bookings = require('../controllers/booking.controller');
var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');
var verifyToken = require('../../config/tokenMiddleware');

//configure routes
module.exports = function(router){

  router.route('/bookings')
    .get(Bookings.getallBookings)
    .post(Bookings.saveBooking);

  router.route('/bookings/:id')
    .get(Bookings.getManagerBookings)
    .post(verifyToken, Bookings.treat)
    .delete(verifyToken, Bookings.deleteBooking);
};