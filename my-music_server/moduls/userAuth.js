var express = require('express');

module.exports = {
    checkIfUserConnected:function(){
        if( req.session.user_connected == true && req.session.user_role > 2){

        }else{
            
        }
    },
    logout:function(){

    }
}