require('dotenv').config()

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
var fs = require("fs");

 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
 
var command = process.argv[2];


if (command == 'my-tweets'){
  var params = {screen_name: 'CodeGico'};
  
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {


      for (var i = 0; i<20; i++){
        if (i < tweets.length){
          console.log(tweets[i].text);
          console.log(tweets[i].created_at);
        }
        
      }
    }
    else {
      console.log(error);
    }
  });
}
else if(command == 'spotify-this-song'){
  var song = process.argv[3];
  
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    //console.log(data); 

    console.log('Song name: ' + data.tracks.items[0].name);
    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Preview of url: ' + data.tracks.items[0].preview_url);
  });

}
else if(command == 'movie-this') {
  var nodeArgs = process.argv.splice(3);

  var movieName = "";

  for (var i = 0; i < nodeArgs.length; i++) {

    if (i > 0 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }

  var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";


  request(movieQuery, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      // console.log(response);
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(
        "\nTitle: " + JSON.parse(body).Title +
        "\nRelease Year: " + JSON.parse(body).Year +
        "\nIMDB Rating: " + JSON.parse(body).imdbRating +
        "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoMeter +
        "\nCountry of Origin: " + JSON.parse(body).Country +
        "\nLanguage: " + JSON.parse(body).Language +
        "\nPlot: " + JSON.parse(body).Plot +
        "\nActors: " + JSON.parse(body).Actors
      );
    }
  });
}
