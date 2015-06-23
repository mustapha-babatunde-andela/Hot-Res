// import the hotel model file
var Hotel = require('../models/hotel.model');
var cloudinary = require('cloudinary');



module.exports = {
  /**
   * [getHotels description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   *
   * api call function to get all hotels stored in database
   * can also get hotels based on query search:
   * location(state, city or both)
   */
  getHotels: function(req, res, next) {
    /**
     * Hotel api controller for hotel search based on location
     */
    

    if (req.query.state && req.query.city) { // if both state and city are specified in query

      Hotel.find({state: {$regex: req.query.state, $options: '$i'}, city: {$regex: req.query.city, $options: '$i'}, bookable: 'yes'}, function(err, hotel) {
        if (err) {
          res.json({message: 'Server Error'});
        }
        if (hotel) {
          if (hotel.length === 0) {
            res.json({message: 'No hotel found in ' + req.query.city + ', ' + req.query.state});
          } else if (hotel.length > 0) {
            res.json(hotel);
          }
        }
      });
    } else if (req.query.state) { // if only state is specified in query
      Hotel.find({state: {$regex: req.query.state, $options: '$i'}, bookable: 'yes'}, function(err, hotel) {
        if (err) {
          res.json({message: 'Server Error'});
        }
        if (hotel) {
          if (hotel.length === 0) {
            res.json({message: 'No hotel found in ' + req.query.state});
          } else if (hotel.length > 0) {
            res.json(hotel);
          }
        }
      });
    } else if (req.query.city) { // if only city is specified in query
      Hotel.find({city: {$regex: req.query.city, $options: '$i'}, bookable: 'yes'}, function(err, hotel) {
        if (err) {
          res.json({message: 'Server Error'});
        }
        if (hotel.length === 0) {
          res.json({message: 'No hotel found in ' + req.query.city});
        } else if (hotel.length > 0) {
          res.json(hotel);
        }
      });
    } else { // pull all hotels in database
      Hotel.find(function(err, hotels){
        if (err) {
          res.json({message: 'No hotel found!'});
        }
        if (hotels) {
          res.json(hotels);
        }
      });
    }
  },

  getManagerHotels: function(req, res, next) {
    Hotel.find({ managerId: req.params.id }, function(err, hotels) {
      if (err) {
        res.json({message: 'Server Error'});
      }
      if (hotels) {
        if (hotels.length === 0) {
          res.json({message: 'Manager currently manages no hotel.'});
        } else if (hotels.length > 0) {
          res.json(hotels);
        }
      }
      next();
    });
  },
  /**
   * [addHotel description]
   * @param {[req]}
   * @param {[res]}
   */

  // function to upload image

  uploadImage: function(req, res, next) {

    cloudinary.uploader.upload(req.files.file.path, function(result) {
      res.json(result);
    });

  },

  // api call function to add hotel profile to database
  addHotel: function(req, res, next) {

    
    var hotel = new Hotel(req.body);
    hotel.save(function(err) {
      if(err) {
        return res.json({ message:'Hotel add error' });
      }
      res.json({ message:'Hotel Added' });
      next();
    });
  },
  /**
   * [editHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to edit specific hotel based on provided id
  editHotel: function(req, res, next) {
    // grab the specified hotel from database
    Hotel.findOne({_id: req.params.id}, function(err, hotel){
      if(err) {
        res.json({ message: 'Server Error' });
      } else {
        for(prop in req.body){
          hotel[prop] = req.body[prop];
        }

        // return modified hotel profile to database
        hotel.save(function(err) {
          if (err) {
            res.json({ message: 'Error Updating Hotel' });
          } else {
            res.json({ message: 'Hotel updated' });
          }
        });
      }
    });
  },
  /**
   * [getSingleHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to grab specific hotel in database
  getSingleHotel: function(req, res, next) {
    Hotel.findOne({ _id: req.params.id }, function(err, hotel) {
      if(err) {
        return res.json({ message: 'Server Error!' });
      }

      if (hotel) {
        res.json(hotel);
      } else {
        res.json({ message: 'No hotel found' })
      }
    });
  },

  /**
   * [deleteHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to delete hotel profile from database based on specified id
  deleteHotel: function(req, res, next) {
    Hotel.remove({ _id: req.params.id }, function(err, hotel) {
      if (err) {
        return res.json({message: 'Internal server error'});
      }
      if (hotel) {
        res.json({ message: 'Successfully deleted' });
      }
      next();
    });
  },

  saveReview: function(req, res, next) {
    Hotel.findOne({ _id: req.params.id }, function(err, hotel) {
      if (err) {
        res.json({ message: 'Server Error' });
      }
      if (hotel) {
        hotel.reviews.push(req.body);
        // return modified hotel to database
        hotel.save(function(err) {
          if (err) {
            res.json({ message: 'Server Error' });
          } else {
            res.json({ message: 'Review saved' });
          }
        });
      } else {
        res.json({ message: 'Hotel not found' });
      }
    });
  }
};