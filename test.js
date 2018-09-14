var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://tom:PasswOrd@incubator0-wpeiv.mongodb.net/test";
MongoClient.connect(uri, function (err, db) {
    db.close();
});
