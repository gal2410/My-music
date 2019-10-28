var mysql = require("mysql");

var instance = null;

/* DB Connection Parameters */
const db_name = "music_DB";
const db_user = "root";
const db_pass = "";
const db_host = "localhost";

/* tables Names */
const music_table_name = "music_table";
const users_table_name = "users";

/* users table admin values */
const admin_name = "Admin";
const admin_username = "Admin";
const admin_password = "123456";
const admin_email = "admin@admin.com";
const admin_role = 1;// administrator

var con = {
    getpool: function(){
        if( instance ){ 
            return instance; 
        }
        createDB();
        instance = mysql.createPool({
            host:db_host,
            user:db_user,
            password:db_pass,
            database:db_name
        });
        return instance;
    }
}

var createDB = function(){
    var create_db_query = `CREATE DATABASE IF NOT EXISTS ${db_name}`;
    let connection = mysql.createConnection({
        host:db_host,
        user:db_user,
        password:db_pass
    });
       
      // connect to the MySQL server
      connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log("connection opend");

        connection.query(create_db_query, function(err, results, fields) {
          if (err) {
            console.log(err.message);
          }
          console.log("music_DB Created!");
          createTables();
        });
       
        connection.end(function(err) {
          if (err) {
            return console.log(err.message);
          }
          console.log("connection closed");
        });
      });
}

var createTables = function(){
    var create_posts_table_query = `create table if not exists ${music_table_name}(
                            id int primary key auto_increment,
                            song_name varchar(255) not null,
                            singer_name text,
                            image varchar(255),
                            _like int default 0
                        )CHARSET=utf8 COLLATE=utf8_unicode_ci`;
    var create_users_table_query = `create table if not exists ${users_table_name}(
        id int primary key auto_increment,
        name varchar(255) not null,
        username varchar(255) unique,
        password varchar(255),
        email varchar(255),
        role int default 2
    )CHARSET=utf8 COLLATE=utf8_unicode_ci`;
    let connection = mysql.createConnection({
        host:db_host,
        user:db_user,
        password:db_pass,
        database:db_name
    });
       
      // connect to the MySQL server
      connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
       console.log("connection opend");

        connection.query(create_posts_table_query, function(err, results, fields) {
          if (err) {
            console.log(err.message);
          }
          console.log("Posts Table Created!");
        });
        connection.query(create_users_table_query, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
            console.log("Users Table Created!");
            insertDefaultData();
          });
        connection.end(function(err) {
          if (err) {
            return console.log(err.message);
          }
          console.log("connection closed");
        });
      });
}


var insertDefaultData = function(){
    let admin_user_query = `INSERT INTO ${users_table_name} (name,username,password,email,role) 
    values('${admin_name}','${admin_username}','${admin_password}','${admin_email}',${admin_role})`; 
    console.log(admin_user_query);
    
    con.getpool().query(admin_user_query,function(err2,results2,fields2){
        if( err2 ){
            console.log( err2.message );
        }
        console.log("Admin Added To DB;");
    });
}

module.exports = con;