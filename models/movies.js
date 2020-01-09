const mongoose = require('mongoose');

const {Schema} = mongoose;

const movieSchema = new Schema(
  {
    Title: String,
    Year: Number,
    Rated:String,
    Released: Date,
    Runtime: String,
    Genre: [String], // a tester si pertinant car plusieurs genres cine
    Director: String,
    Writer:String,
    Actors:String,
    Plot:String,
    Language:[String],
    Country: String,
    Awards:String,
    Poster:{ type:String, default: 'https://www.sciencesetavenir.fr/assets/img/2016/03/09/cover-r4x3w1000-57df40df2241f-les-signes-de-la-douleur-chez-le-chat.jpg'},
    
  }
)

const movie = mongoose.model('movie', movieSchema);
module.exports = movie;