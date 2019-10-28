var express = require('express');
var router = express.Router();
var connection_pool = require('../DB/connection').getpool();
var response = require('../moduls/response');
var userAuth = require('../moduls/userAuth');
// userAuth = require(path.join(__dirname,'/modules/userAuth'))

/* GET posts listing. */
router.get('/', function(req, res, next) {
    // if( req.session.isconnected == false ){
    //     res.json("User not connected");
    // }
    // req.session.myshopdata = {
    //     cloth:10,
    //     tshirt:true
    // }
    response.clearResponse();
    connection_pool.query("SELECT * FROM music_table",function(err,results,fields){
        if( err ){
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
    });
});

router.get('/postById',function(req, res, next){
    response.clearResponse();
    var id = req.query.id;
    console.log("Edit ID: " + id);
    connection_pool.query("SELECT * FROM music_table where id=" + id,function(err,results,fields){
        if( err ){
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
            res.end();
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
        res.end();
    });
});

/* Post new Record to posts Table */
router.post('/',function(req,res,next){
    // if( req.session.isconnected == false ){
    //     res.json("User not connected");
    // }
    //console.log( req.session );
    response.clearResponse();
    console.log(req.body);
    var song_name = req.body.post.song_name;
    var song_url = req.body.post.song_url;
    var singer_name = req.body.post.singer_name;

    var img = req.body.post.img;
    var _like = req.body.post._like;
    
    var sql = `INSERT INTO music_table (song_name,singer_name,song_url,image,_like) values('${song_name}','${singer_name}','${song_url}','${img}',${_like})`;
    connection_pool.query(sql,function(err,results,fields){
        if( err ){
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success Adding Record";
        response.data = results;
        res.json(response);
    });
});

/* UPDATE Record from posts Table */
router.put('/',function(req,res,next){
    // if( req.session.isconnected == false ){
    //     res.json("User not connected");
    // }
    console.log( req.body );
    response.clearResponse();
    var post_to_edit = req.body.post;
    var id = post_to_edit.id;
    var song_name = post_to_edit.song_name;
    var singer_name = post_to_edit.singer_name;
    var song_url = post_to_edit.song_url;
    var img = post_to_edit.img;
    var _like = post_to_edit._like;

    var sql = `UPDATE music_table SET song_name='${song_name}',singer_name='${singer_name}',song_url='${song_url}',image='${img}',_like=${_like}  WHERE id = ${id}`;
    console.log(sql);
    connection_pool.query(sql,function(err,results,fields){
        if( err ){
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
            res.end();
        }
        response.success = 1;
        response.response_text = "success Updating Record";
        response.data = results;
        res.json(response);
    });
});

/* Delete Record from posts Table */
router.delete('/',function(req,res,next){
    response.clearResponse();

    var id = req.body.id;
    console.log( req.body );
    if( id ){
        var sql = `DELETE FROM music_table WHERE id = ${id}`;
        console.log(sql);
        try{
            connection_pool.query(sql,function(err,results,fields){
                if( err ){
                    response.err = 1;
                    response.response_text = err.message;
                    res.json(response);
                    res.end();
                }
                response.success = 1;
                response.response_text = "success Deleting Record";
                response.data = results;
                res.json(response);
                res.end();
            });
        }catch(err_catch){
            response.err = 1;
            response.response_text = err_catch.message;
            res.json(response);
            res.end();
        }
    }else{
        response.err = 1;
        response.response_text = "Id Not Set";
        res.json(response);
        res.end();
    }
    

});

router.put('/setlike',function(req,res,next){
    response.clearResponse();

    var id = req.body.id;
    var _like = req.body._like;
    var sql = "Select * From music_table Where id='" + id + "'";
    console.log(sql);
    connection_pool.query(sql,function(err,results,fields){
        if( err ){
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
            res.end();
        }
        console.log( "Results: ", results);
        if( results.length > 0 ){
            if( results[0]._like == _like ){
                _like = 0;
            }
            sql = "UPDATE music_table SET _like=" + _like + " Where id=" + id;
            connection_pool.query(sql,function(err,results,fields){
                if( err ){
                    response.err = 1;
                    response.response_text = err.message;
                    res.json(response);
                    res.end();
                }
                response.success = 1;
                response.response_text = "Post Was Updated";
                response.data = [];
                res.json(response);
                res.end();
            });
        }else{
            response.success = 0;
            response.response_text = "Post Not Found";
            response.data = [];
            res.json(response);
            res.end();
        }
    });

})

module.exports = router;
