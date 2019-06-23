var express = require("../node_modules/express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("../node_modules/bcryptjs");
var jwt = require("../node_modules/jsonwebtoken");

router.post("/create", (req, res) => {
  // build and store object basked upon a module
  // send object to the database
  // send a response with the user object created
  // send a response with error in a .catch

  const newUser = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,10)
  };
  User.create(newUser)
    .then(user => {
        let token = jwt.sign({id: user.id}, 'my_secret_key', {expiresIn: 60*60*24})
        res.status(200).json({user, token})
    })
    
    .catch(err => res.status(500).json({ err: err.mesage }));
});

router.post("/login", (req, res) => {
  // check if user exists
  // compare passwords

  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({id: user.id}, 'my_secret_key', {expiresIn: 60*60*24})

        res.status(200).json({ message: "login success", user, token });
      } else {
        res.status(500).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
