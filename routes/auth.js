const express = require("express");
const router = express.Router();
// User model
const User = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;



router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password || !email) {
    res.status(400).json({message: "indiquez un username un password et un email"});
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "cet username existe deja" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });
    
    newUser.save()
    .then(() => {
      res.json({message:"user created"});
    })
    .catch(err => {
      res.json({ message: "Something went wrong" });
    })
  });

});


router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if ( !username|| !password) {
    res.json({message: " entrer un username et un password"});
    return;
  }

  User.findOne({ "username": username })
  .then(user => {
      if (!user) {
        res.json({message: "cet username nexiste pas"});
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
       res.json({message:"connecte"})
      } else {
        res.json({message: "mauvais mot de passe"});
      }
  })
  .catch(error => {
    next(error);
  })
});


module.exports = router