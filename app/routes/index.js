var hotelRoutes = require('./hotel.route');
var managerRoutes = require('./manager.route');
var bookingRoutes = require('./booking.route');

module.exports = function(router){
  
   hotelRoutes(router);
   managerRoutes(router);
   bookingRoutes(router);
};