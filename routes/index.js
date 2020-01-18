const express = require('express');
const router  = express.Router();
const Movie = require('../models/movies.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(movies => {
      console.log('Movies list: ', movies);
      res.render('movies', {movies});
    })
    .catch(next)
  ;
});

router.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          //    |
    res.redirect("/login");         //    |
  }                                 //    |
}); // ------------------------------------                                
//     | 
//     V
router.get("/secret", (req, res, next) => {
  res.render("secret");
});

// router.get('/movies/:id', (req, res, next) => {
//   const id = req.params.id;

//   Movie.findById(id)
//     .then(movie => {
//       res.render('movie', {movie: movie});
// })
// });

module.exports = router;
