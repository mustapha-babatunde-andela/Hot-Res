var Manager = require('../models/manager.model');
// var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');
// var salt = bcrypt.genSaltSync(10);

module.exports = {
  /**
   * [getManagers description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getManagers: function(req, res, next){
      Manager.find(function(err, managers){
        if(err) {
          res.json(err);
        }
        if (managers) {
          var newManagerObject = [];
          // build a new object to mask the password
          for (x in managers) {
            var object = {};
            object.id = managers[x]._id;
            object.name = managers[x].name;
            object.username = managers[x].username;
            object.email = managers[x].email;
            object.imageUrl = managers[x].imageUrl;
            newManagerObject.push(object);
          }
          // return the new object built from above
          res.json(newManagerObject);
        } else {
          res.json({ message: 'Manager not found' });
        }
        next();
      });
  },

  getSingleManager: function(req, res, next) {
    Manager.findOne({ _id: req.params.id }, function(err, manager) {
      if (err) {
        res.json({ message: 'Manager not found!' });
      }
      if (manager) {
        res.json({
          id: manager._id,
          name: manager.name,
          username: manager.username,
          email: manager.email,
          imageUrl: manager.imageUrl
        });
      } else {
        res.json({ message: 'Manager not found' });
      }
      next();
    });
  },

  /**
   * [addManager description]
   * @param {[req]}
   * @param {[res]}
   */
  addManager: function(req, res, next) {
    var manager = new Manager(req.body);
    // var hash = bcrypt.hashSync(req.body.password, salt);
    // manager.password = hash;
    manager.save(function(err) {
      if (err) {
        if(err.name == 'MongoError' && err.message.indexOf('$email_1') > 0 ) {
          res.status(400).json({ message: 'Email is already registered. Please choose another' });
        } else if ( err.name == 'MongoError' && err.message.indexOf('$username_1') > 0) {
          res.status(500).json({ message: 'Username is already taken. Please choose another' });
        }
      } else {
        res.json({message:'Sign up successful. Please Login to continue.'});
      }
      next();
    });
  },

  /**
   * [editManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editManager: function(req, res, next){
    Manager.findOne({ _id: req.params.id }, function(err, manager) {
      
      if (err) {
        res.json({ message: 'Server Error' });
      }

      // edit the returned object
      manager.name = req.body.name || manager.name;
      manager.imageUrl = req.body.imageUrl || manager.imageUrl;
      
      // return edited manager object to database
      manager.save( function(err) {
        if (err) {
          res.json({ message: 'Manager update failed' });
        } else {
          res.json({ message: 'Manager updated!' });
        }
      });
    });
  },

  /**
   * [deleteManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteManager: function(req, res, next){

    Manager.remove({ _id: req.params.id }, function(err, manager) {
      if (err) {
        res.json({ message: 'Deletion Error' });
      }
      if (manager) {
        res.json({ message: 'Successfully deleted' });
      }
    });
  },

  /**
   * [managerLogin description]
   * @param  {[req]}
   * @param  {[res]}
   * @param  {Function}
   * @return {[void]}
   */
  managerLogin: function(req, res, next) {
    var manager = new Manager();
    // create a token for user
    var token = jwt.sign(manager, secret.sessionSecret, { expiresInMinutes: 1440 });

    Manager.find({username: req.body.username}, function(err, manager) {
      if (err) {
        res.json({message: 'Internal Server Error!'});
      }

      if (manager.length === 0) {
        res.json({message: 'Username does not exist!'});
      } else if (manager.length === 1) {
        // if (bcrypt.compareSync(req.body.password, manager[0].password)) {
        if (req.body.password === manager[0].password) {
          // return formatted object
          res.json({
            id: manager[0]._id,
            name: manager[0].name,
            username: manager[0].username,
            imageUrl: manager[0].imageUrl,
            token: token
          });
        } else {
          res.json({message: 'Password Incorrect!'});
        }
      }
      next();
    });
  }
}