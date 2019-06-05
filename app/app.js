var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;

// per gestire le richieste POST:
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const cors = require('cors');
app.use(cors());

app.set('views', './views');
app.set('view engine', 'pug');

/*app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});*/


app.post('/register', function (req, res) {

    console.log('reggistratoooo');

         MongoClient.connect('mongodb+srv://admin:5r46GHUPyR1GuP4R@cluster0-wwe7j.mongodb.net/?retryWrites=true{useNewUrlParser: true}', function(err, db) {
     if (err) {
       throw err;
     }
              var dbo = db.db("FinalProject");
              var newRist = { name: req.body.name, surname: req.body.sname, username: req.body.username, password: req.body.password };
              dbo.collection("Login").insertOne(newRist, function(err, result) {
                if (err) { throw err; }

                res.send(true)
                db.close();
              });
    });
});

app.post('/login', function (req, res) {

    console.log('loggatoooooo');

     MongoClient.connect('mongodb+srv://admin:5r46GHUPyR1GuP4R@cluster0-wwe7j.mongodb.net/?retryWrites=true{useNewUrlParser: true}', function(err, db) {
     if (err) {
       throw err;
     }
     var dbo = db.db("Tecnologie");
     dbo.collection("Login").findOne({username: req.body.username, password: req.body.password}, function(err, result) {
       if (err) { throw err; }

                res.send(true)
                db.close();
     })
   });
});

app.post('/data', function (req, res) {

    console.log('datiiii');

     MongoClient.connect('mongodb+srv://admin:5r46GHUPyR1GuP4R@cluster0-wwe7j.mongodb.net/?retryWrites=true{useNewUrlParser: true}', function(err, db) {
     if (err) {
       throw err;
     }
     var dbo = db.db("Tecnologie");
     dbo.collection("Login").findOne({name: req.body.name, surname: req.body.sname,username: req.body.username}, function(err, result) {
       if (err) { throw err; }

                res.send(true)
                db.close();
     })
   });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
