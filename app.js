// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

var requireKeys = require("./keys.js");

var Twitter = require("twitter");

var twitterClient = new Twitter({
  consumer_key: requireKeys.twitterKeys.consumer_key,
  consumer_secret: requireKeys.twitterKeys.consumer_secret,
  access_token_key: requireKeys.twitterKeys.access_token_key,
  access_token_secret: requireKeys.twitterKeys.access_token_secret
});
 
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: requireKeys.spotifyKeys.client_id,
  secret: requireKeys.spotifyKeys.client_secret
});

var apiItems = process.argv[2];
var myTweets = "my-tweets";
var spotifySong = "spotify-this-song";
var movieThis = "movie-this";


switch(apiItems){

  case myTweets :
    getTweets();
  break

  case spotifySong : 
  var songName = process.argv[3];
  getSong(songName);
  break

  case movieThis :
  var movieName = process.argv[3];
  getMovie(movieName);
  // splitMovie(movieName);

  break

  default : 
     console.log("invalid command")
  //failure message if command is invalid
}

// function splitMovie(str){
//          var splitMovie = str.split(" ");

//          var finalMovietitle = "";
//          for (var i = 0; i < splitMovie.length; i++){
//          finalMovietitle += splitMovie[i] + "+";

//          if (i > 2 && i < str.length)
//          }
// console.log(finalMovietitle);
// }

function getTweets(){
    var params = {screen_name: 'murphyx232'};
    twitterClient.get('statuses/user_timeline.json', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets.length);
        tweets.forEach(function(tweet){
        console.log(tweet.text);

        })
      }
    });
}

function getSong(song){
  if (!song){
    song = "the sign"
  }
  spotify.search({ type: 'track', query: song }, function(err, data) {
     if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log("Name: " + data.tracks.items[0].name);
console.log("Artist: " + data.tracks.items[0].artists[0].name);
console.log("Album: " + data.tracks.items[0].album.name);
console.log("Link: " + data.tracks.items[0].href);


});
}

function getMovie(movie){

var encodedMovieName = encodeURI(movie)

var imdbUrl = "http://www.omdbapi.com/?t=" + encodedMovieName + "&y=&plot=short&apikey=" + requireKeys.movieKey.apiKey

console.log("IMDB URL -- ", imdbUrl)

request(imdbUrl, function(error, response, body) {
  var movieJson = JSON.parse(body)
  console.log(movieName)
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    // console.log(movieJson);
 
    console.log("The movie's Title is: " + movieJson.Title);
    console.log("The movie's Production Year is: " + movieJson.Year);
    console.log("The movie's IMDB Rating is: " + movieJson.imdbRating);
    // console.log("The movie's Rotton Tomatoes Rating is: " + movieJson.Ratings;
    console.log("This movie was made in: " + movieJson.Country);
    console.log("The movie's Language is: " + movieJson.Language);
    console.log("Here is this movie's plot: " + movieJson.Plot);
    console.log("The actors in this movie are: " + movieJson.Actors);


};
});
}