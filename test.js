var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://tamholmlohmat:Sch!ph0l@incubator0-wpeiv.mongodb.net/test";
MongoClient.connect(uri, function (err, db) {
    db.close();
});