// Outstanding issues/questions -----------------------------------------------------------------------------------------------
// 1) figure out what the fourth case "do-what-it-says" mean
//-----------------------------------------------------------------------------------------------------------------------------

// npm requirements
var fs = require("fs");

require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');
moment().format();

// global variables to take in what the user types
var action = process.argv[2];

var args = process.argv;

var input = [];
for (var i = 3; i < args.length; i++){
  input.push(args[i])
  var inputFull = input.join(" ");
};

// function to capture all of the artists names in spotify this
var artists = function(artist){
    return artist.name;
};

// variable to limit spotify display to 10 results
var songLimit = 10;

// function for concert-this
function concertThis (){
    var queryURL = "https://rest.bandsintown.com/artists/" + inputFull + "/events?app_id=codingbootcamp";        
    console.log(queryURL);
    axios.get(queryURL).then(
        function(response) {
            if (response.data.length === 0) {
                console.log("This band does not have any shows currently scheduled")
            } else {
                for (i = 0; i < response.data.length; i++){
                    console.log("----------------------------------------------------------------------------------");
                    console.log(i);
                    console.log("The name of the venue is: " + response.data[i].venue.name);
                    console.log("The location of the venue is: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("The concert date is: " + moment(response.data[i].datetime).format('L'));
                };
            }   
        });
    };

//function for spotify-this-song
function spotifyThis (){
    if (input.length === 0){
        input = "The Sign Ace of Base";
        inputFull = input;
        songLimit = 1; 
    };
    // console.log(input);
    // console.log(inputFull);
    spotify.search({ type: 'track', query: inputFull, limit: songLimit }, function(err, data) {
        console.log(inputFull);
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++){
            console.log("----------------------------------------------------------------------------------");
            console.log(i);
            console.log("The artist(s) is/are " + data.tracks.items[i].artists.map(artists));
            console.log("The song is called " + data.tracks.items[i].name);
            console.log("The album is called " + data.tracks.items[i].album.name);
            console.log("Here is a link to preview the song: " + data.tracks.items[i].preview_url);    
        }
        });
    };

// function for movie-this
function movieThis () {
    if (input.length === 0){
        input = "Mr. Nobody";
        inputFull = input; 
    };
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
    };

// function for do-what-it-says
function doWhatItSays (){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        input = dataArr[1];
        inputFull = input;

        if (dataArr[0] == "concert-this"){
            concertThis();
        } else if (dataArr[0] == "spotify-this-song"){
            spotifyThis();
        } else if (dataArr[0] == "movie-this"){
            movieThis ();
        }
    });
};

// Switch statement to run the above functions when called
switch (action) {
    case "concert-this":
        concertThis ();
        break;
    case "spotify-this-song":
        spotifyThis ();
        break;
    case "movie-this":
        movieThis ();
        break;
    case "do-what-it-says":
        doWhatItSays ();
        break;
    default:
        console.log("An error occurred! Unrecognized input.");
}