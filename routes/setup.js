var express = require('express');
var router = express.Router();
var User = require('../app/models/user');


router.get('/setup',function(req,res){
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  nick.save(function(err){
    if(err)throw err;

    console.log('User saved successfully');
    res.json({success:true});
  });

});


module.exports = router;
