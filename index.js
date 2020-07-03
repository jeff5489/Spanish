const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const mongoose = require('mongoose');

const messages = require('./db/messages');

const app = express();

const spanishDB = 'mongodb://localhost/spanishDB';
mongoose.connect(spanishDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'full stack message board! 🎉'
  });
});

// ++++++++++++++++++++++++++++++++++ Messages Begin
// ++++++++++++++++++++++++++++++++++ 

app.get('/messages', (req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  });
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  messages.create(req.body).then((message) => {
    res.json(message);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});

// ++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++ Messages End

const setSchema = new mongoose.Schema({
  spanish: String,
  english: String,
  group: String,
  type: String
});

const groupNumberSchema = new mongoose.Schema({
  group: String
});

const Set = mongoose.model('Set', setSchema);
const GroupNumber = mongoose.model('GroupNumber', groupNumberSchema);

app.get('/spanish', function(req, res) {
  console.log('getting all sets');
  Set.find({})
    .exec(function(err, sets) {
      if(err) {
        res.send('error occured')
      } else {
        // console.log(sets);
        res.json(sets);
      }
    });
});

app.get('/allSetsInGroup/:id', function(req, res) {
  console.log('/allIdsInGroup');
  console.log(req.body.groupNumber);

  Set.find({ group: req.params.id})
    .exec(function(err, sets) {
      if(err) {
        res.send('error occured')
      } else {
        // console.log(sets);
        res.json(sets);
      }
    });
});

app.get('/spanish/:id', function(req, res) {
  console.log('getting one set');
  Set.findById(req.params.id)
    .exec(function(err, set) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(set);
        res.json(set);
      }
    });
});

app.post('/spanish', function(req, res) {
  let set = new Set();
  set.spanish = req.body.spanish;
  set.english = req.body.english;
  set.group = req.body.group;
  set.type = req.body.type;
  set.save(function (err, set) {
    if (err) return console.error(err);
    res.send(set);
  });
});

app.delete('/spanish/', function(req, res) {
  let _id = req.body._id;
  console.log("req.body._id: " + req.body._id)
  Set.findOneAndRemove({
    _id: _id
  }, function(err) {
    if(err) {
      console.log(err)
      res.send('error removing')
    } else {
      res.send('remove successful')
      res.status(204);
    }
  });
});

app.get('/groupNumber', function(req, res) {
  console.log('getting all group numbers');
  GroupNumber.find({})
    .exec(function(err, groupNumbers) {
      if(err) {
        res.send('error occured')
      } else {
        // console.log(groupNumbers);
        res.json(groupNumbers);
      }
    });
});

app.post('/groupNumber', function(req, res) {
  let groupNumber = new GroupNumber();
  groupNumber.group = req.body.group;
  
  console.log("req.query.group: " + req.query.group)
  res.send(req.query.group);

  // groupNumber.save(function (err, groupNumber) {
  //   if (err) return console.error(err);
  //   res.send(groupNumber);
  // });
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});