require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");

var action = process.argv[2];
var artist = process.argv[3];

switch (action) {
    case "concert-this":
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        
        console.log(queryURL);

        axios.get(queryURL).then(
            function(response) {
                // console.log(response.data);
                for (i = 0; i < response.data.length; i++){
                console.log("The name of the venue is: " + response.data[i].venue.name);
                console.log("The location of the venue is: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("The concert date is: " + response.data[i].datetime);
            }   
            });
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("An error occurred! Unrecognized input.");
}