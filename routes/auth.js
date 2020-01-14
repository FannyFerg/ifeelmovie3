const express = require("express");
const router = express.Router();
// User model
const User = require("../models/user");

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === "") {
    res.render("auth/signup", {
      errorMessage: "Indiquer un nom d'utilisateur pour vous connecter"
    });
    return;
  }

    
  else if (password === "") {
    res.render("auth/signup", {
      errorMessage: "Indiquez un mot de passe pour vous connecter"
    });
    return;
  }

  User.findOne({ "username": username })
    .then(user => {
      if (user) {
        res.render("auth/signup", {
          errorMessage: "The username already exists!"
        });
        return; // ✋STOP
      }


  // Let's hash the password
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass // 👈 store the hashed version
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => next(err))
});

})
module.exports = router