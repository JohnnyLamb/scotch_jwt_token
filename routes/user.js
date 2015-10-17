var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var app = require('../server.js').app;
var app = express();
// var app = require('../server.js');

// var mongoose = require('mongoose');
var config = require('../config');
app.set('superSecret', config.secret);
// mongoose.connect(config.database);



router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;


    if (!user) {
      res.json({
        success: false,
        message: 'authentication failed. user not found'
      });

    } else if (user) {

      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'authentication failed. wrong password man!'
        });
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });

        res.json({
          success: true,
          message: 'enjoy your token dude',
          token: token
        });
      }

    }

  });
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});




router.get('/users', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


module.exports = router;
