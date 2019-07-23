// Outstanding issues/questions -----------------------------------------------------------------------------------------------
// 1) figure out how to recognize a null answer for the case "concert this". e.g. foster the people
// 2) figure out why we needed to do the .map for the spotify artist names
// 3) make spotify default to "The Sign" by "Ace of Bass" if no song is provided
// 4) make OMDB default to "Mr. Nobody" if no movie is provided

//-----------------------------------------------------------------------------------------------------------------------------
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
        var queryUrl = "http://www.omdbapi.com/?t=" + inputFull + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);
        axios.get(queryUrl).then(
            function(response) {
                //console.log(response.data);
                console.log("----------------------------------------------------------------------------------")
                console.log("The movie title is " + response.data.Title);
                console.log("The movie was released in " + response.data.Year);
                console.log("The IMDB rating is " + response.data.imdbRating);
                console.log("The Rotten Tomatoes rating is " + response.data.Ratings[1].Value);
                console.log("The movie was produced in " + response.data.Country);
                console.log("The movie's language is " + response.data.Language);
                console.log("The movie's plot is: " + response.data.Plot);
                console.log("The movie starred "+ response.data.Actors); 
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log(error.config);
            });       
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("An error occurred! Unrecognized input.");
}