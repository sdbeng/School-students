var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('school');

app.get('/', function(req, res){

    // Find one document in our collection
    db.collection('students').findOne({}, function(err, doc) {

        if(err) throw err;

        res.render('hello', doc);
    });
});

// app.get('/working', function(req,res){
//     //query students with lower score
//     db.collection('students').find({}, function(err, doc){
//         if(err) throw err;

//         //define a homework.html page in views dir
//         res.render('homeworks', doc);
//     });
// });

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
});

mongoclient.open(function(err, mongoclient) {

    if(err) throw err;

    app.listen(8080);
    console.log('Express server started on port 8080...');
});
