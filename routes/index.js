var express = require('express');
var router = express.Router();

const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/users/create', async(req, res) => {
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('mydb').collection('users').insertOne({
    id: parseInt(user.id),
    fname: user.fname,
    lname: user.lname,
    username: user.username,
    email: user.email,
    avatar: user.avatar
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "User with ID = "+user.id+" is created",
    "user": user
  });
})

module.exports = router;
