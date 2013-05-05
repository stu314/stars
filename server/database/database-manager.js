var dbURI = 'mongodb://admin:adminpass@dharma.mongohq.com:10040/stars';
var collections = ["stars","content"];
var MongoJS = require('mongojs');
var Server = require('mongodb').Server;
var moment = require('moment');

var dbPort = 10040;
var dbHost = 'dharma.mongohq.com';
var dbName = 'stars';

/* establish a database connection */

var db = MongoJS.connect(dbURI, collections);

var stars = db.collection('stars');
var content = db.collection('content');

/*get data*/

exports.getStars = function(callback){
    stars.find(function(error, output){
        output!== null ? callback(output[0].stars) : callback(null);
    });  
};

exports.getContent = function(id, callback){
    id = parseInt(id);
    content.find({iD:id}, function(error, output){
        output!== null ? callback(output[0].content) : callback(null);
    });
};