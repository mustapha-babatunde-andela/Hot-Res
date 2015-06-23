// import the booking model file
var Booking = require('../models/booking.model');

module.exports = {

  saveBooking: function(req, res, next) {

    var booking = new Booking(req.body);
    booking.save(function(err) {
      if(err) {
        return res.json({message: 'Error sending reservation'});
      }
      res.json({message:'Reservation sent'});
      next();
    });
  },

  getallBookings: function(req, res, next) {
    Booking.find(function(err, bookings){
      if(err) {
        res.json({message: 'Server error'});
      }
      if (bookings.length > 0) {
        res.json(bookings);
      } else {
        res.json({ message: 'No Booking found' });
      }
      next();
    });
  },

  getManagerBookings: function(req, res, next) {
    Booking.find({ managerId: req.params.id}, function(err, bookings) {
      if (err) {
        res.json({ message: 'Server error' });
      }
      if (bookings.length > 0) {
        res.json(bookings);
      } else {
        res.json({ message: 'No new booking' });
      }
      next();
    });
  },

  deleteBooking: function(req, res, next) {
    Booking.remove({ _id: req.params.id }, function(err, booking) {
      if (err) {
        res.json({ message: 'Deletion Error' });
      }
      if (booking) {
        res.json({ message: 'Successfully deleted' });
      }
    });
  },

  treat: function(req, res, next) {
    Booking.findOne({_id: req.params.id}, function(err, booking) {
      if (err) {
        res.json({ message: 'Fetch error' });
      }
      if (booking) {
        // change the value in booking.confirmed field
        booking.confirmed = true;
        // return booking to database
        booking.save(function(err) {
          if (err) {
            res.json({ message: 'Booking can\'t be treated at the moment' });
          } else {
            res.json({ message: 'Booking marked as treated' });
          }
          next();
        });
      }
    });
  }
};





