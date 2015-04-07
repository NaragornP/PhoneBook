livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");
/* ======================================= */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;
var PhoneBook = null;
/* ======================================= */
//var port = 4000;
var express = require('express');
var app = express();
app.use(express.static('./public/'));
app.get('/addPhone', function(request, response) {
    var insertData = {
        book_id: request.query.book_id,
        name: request.query.name,
        surname: request.query.surname,
        number: request.query.number
    };
    PhoneBook.insert(insertData, function() {
        response.send('Success');
    });
});
app.get('/getPhone/:book_id?', function(request, response) {
    var find = {};
    if (request.params.book_id) find.book_id = request.params.book_id;
    PhoneBook.find(find).toArray(function(err, result) {
        response.send(JSON.stringify(result));
    });
});
app.get('/updatePhone/:book_id', function(request, response) {
    var find = {};
    var newData = {};
    if (request.params.book_id) find._id = new ObjectID(request.params.book_id);
    // if (request.query.name) newData.name = request.query.name;
    // if (request.query.surname) newData.surname = request.query.surname;
    if (request.query.number) newData.number = request.query.number;
    console.log(newData);
    PhoneBook.update(find, {
        '$set': newData
    }, function(err, result) {
        response.send('Success');
    });
});
app.get('/removePhone/:book_id', function(request, response) {
    var find = {};
    if (request.params.book_id) find._id = new ObjectID(request.params.book_id);
    PhoneBook.remove(find, function(err, result) {
        if (err) response.send(err);
        else response.send('Success');
    });
});
MongoClient.connect('mongodb://Naragorn:824687893@kahana.mongohq.com:10071/Naragorn_Work', function(err, db) {
    if (err) throw err;
    PhoneBook = db.collection('PhoneBooks');
    app.listen(process.env.PORT || 3000, function() {
        console.log('listening on');
    });
    // app.listen(process.env.PORT || 3000);
    // console.log("\nhttp://127.0.0.1:" + port + "\n");
});