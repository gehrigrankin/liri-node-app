require('dotenv').config()

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys');
 
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
  

}