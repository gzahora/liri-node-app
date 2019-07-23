require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');
moment().format();

var action = process.argv[2];

var args = process.argv;

var artists = function(artist){
    return artist.name;
};


// Then use the geocoder object to search the address
var input = [];
for (var i = 3; i < args.length; i++){
  input.push(args[i])
  var inputFull = input.join(" ");
};


switch (action) {
    case "concert-this":
        var queryURL = "https://rest.bandsintown.com/artists/" + inputFull + "/events?app_id=codingbootcamp";        
        console.log(queryURL);
        axios.get(queryURL).then(
            function(response) {
                // console.log(response.data);
                for (i = 0; i < response.data.length; i++){
                    if (response.data.length === 0) {
                        console.log("This band does not have any shows currently scheduled")                        
                    } else {
                        console.log("----------------------------------------------------------------------------------");
                        console.log("The name of the venue is: " + response.data[i].venue.name);
                        console.log("The location of the venue is: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                        console.log("The concert date is: " + moment(response.data[i].datetime).format('L'));
                    };
            }   
            });
        break;
    case "spotify-this-song":
            spotify.search({ type: 'track', query: inputFull }, function(err, data) {
                console.log(data.tracks.items[0]);
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                for (i = 0; i < data.tracks.items.length; i++){
                    console.log("----------------------------------------------------------------------------------");
                    console.log("The artist(s) is/are " + data.tracks.items[i].artists.map(artists));
                    console.log("The song is called " + data.tracks.items[i].name);
                    console.log("The album is called " + data.tracks.items[i].album.name);
                    console.log("Here is a link to preview the song: " + data.tracks.items[i].preview_url);    
                }
              });
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("An error occurred! Unrecognized input.");
}