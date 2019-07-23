require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require('moment');
moment().format();

var action = process.argv[2];

var args = process.argv;


// Build your address as an array or string
var artist = [];


// Then use the geocoder object to search the address
for (var i = 3; i < args.length; i++){
  artist.push(args[i])
  var artistFull = artist.join(" ");
};


switch (action) {
    case "concert-this":
        var queryURL = "https://rest.bandsintown.com/artists/" + artistFull + "/events?app_id=codingbootcamp";
        
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
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("An error occurred! Unrecognized input.");
}