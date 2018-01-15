var express = require('express');
var    mongoose = require('mongoose');
var    bodyParser = require('body-parser');

var uri = "mongodb://incubator0-shard-00-00-8ano0.mongodb.net:27017,incubator0-shard-00-01-8ano0.mongodb.net:27017,incubator0-shard-00-02-8ano0.mongodb.net:27017/test?ssl=true&replicaSet=Incubator0-shard-0&authSource=admin";
// check page https://cloud.mongodb.com/v2/5a36baacdf9db12e12181233#clusters
var options = {
        server: { poolSize: 5 },
        useMongoClient: true
    }
    // mongoose.connect(uri, options);
// const connection = mongoose.connect(uri, options);


//var db = mongoose.connect('mongodb+srv://tamholmlohmat:Sch!ph0l@incubator0-wpeiv.mongodb.net/test');
//var db = mongoose.connect('mongodb://tamholmlohmat:Sch!ph0l@incubator0-shard-00-00-8ano0.mongodb.net:27017,incubator0-shard-00-01-8ano0.mongodb.net:27017,incubator0-shard-00-02-8ano0.mongodb.net:27017/admin?replicaSet=Incubator0-shard-0&ssl=true');
var db = mongoose.connect(uri,options);
var Book = require('./models/bookModel');
var app = express();
var port = process.env.port || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to api started with gulp')
});
app.listen(port, function () {
    console.log('Running on PORT:' + port);
});