var express = require('express');
var app = express();
var connection_pool = require('../DB/connection').getpool();
var response = require('../moduls/response');
var router = express.Router();

/* Try To Login User */
router.post('/login',function(req,res,next){
  console.log( req.body );
  response.clearResponse();
  var username = req.body.username;
  var password = req.body.password;
  req.session.isconnected = false;

  connection_pool.query(`SELECT name,username,email,role FROM users 
  WHERE username='${username}' and password='${password}'`,function(err,results,fields){
    if( err ){
        response.err = 1;
        response.response_text = err.message;
        res.json(response);
    }
    if( results.length > 0 ){
      req.session.isconnected = true;
      response.success = 1;
      response.response_text = "user Found";
    }else{
      response.success = 0;
      response.response_text = "user not Found";
    }

    response.data = results;
    res.json(response);
  });
});

module.exports = router;
