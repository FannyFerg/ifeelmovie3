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
  const mood = req.query.mood; // sad

  const filters = {
    heartbroken: {Genre: { $nin: ["Romance"] }},
    sad: {Genre: { $nin: ["Drama"] } },
    happy: {}
  } 


  Movie.find(filters[mood])
    .then(movies => {
      let selectedIndexes = [];

      for (let i = 0; i < 5; i++) {
        selectedIndexes.push(Math.floor(Math.random() * movies.length))
      }
      const randomMovies= movies.filter((movie, index) =>
      selectedIndexes.includes(index)
      
      )



      // const randomMovies = movies.map((movie, index) => {
      //   const randomIndex = Math.floor(Math.random() * movies.length) 
      //   if(index === randomIndex){

      //     return movie
      //   }
      // })
        console.log(randomMovies);
        
      res.render('movies', {movies:randomMovies})
    })
    .catch(next);
    
  })

/* créer array vide pour les films 
let selectedMovies = [];

// créer array pour index sélectionnés
let selectedIndexes = [];

// boucle for pour tirer au hasard 5 index 
  // tirer index au hasard 
  for (let i = 0; i < 5; i++) {
    selectedIndexes = selectedIndexes + i;

  // check si index en double ou pas
    // si double > break

  if(selectedIndexes.indexOf(i) !== -1){
    break;
    } 

    // si pas en double > on push dans l'array l'index sélectionnés
  else{
  selectedIndexes.push(i);
    // push le film dans l'array de film
  db.movie.getIndexes(selectedIndexes)
  selectedMovies.push(selectedIndexes)

} 

}

*/

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

router.get("/test", (req, res, next) => {
  res.render("Test");
});


router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movie => {
      res.render('movie', {movie: movie}); //  des données a cette object 
    }).catch(next)
})

module.exports = router;
