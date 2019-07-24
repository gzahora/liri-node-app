# liri-node-app

## Author

**Greg Zahora** 

- - -

## Description
LIRI is a Language Interpretation and Recognition Interface (similar to Apple's SIRI). LIRI is a command line node app that takes in parameters and returns data from available databases. The user can use the below commands to find the information they are looknig for. 

The `Commands` are:
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`

- - -

### **Video Guide**

Watch the video here: https://drive.google.com/file/d/1U8GoKvT5iZDGjNovmTz_JtB5raJmYc-K/view

### **Instructions**

1. Open your terminal.
2. Navigate to the folder that contains the `liri.js` file. 
3. Run one of the four commands 

    **Example 1**: Run the `concert-this` command
    
        node liri.js concert-this <name of artist or band>
    
    Output: The system will display a list of all events and locations where the artist or band will perform.

    **NOTE** no extra symbols are needed when typing the name of the artist/band.
    * e.g. 
        1. CORRECT: young the giant
        2. INCORRECT: "young the giant" 
        3. INCORRECT: < young the giant >

    **Example 2**: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: The system will display a list of information associated with the song. It can result in multiple records by different artists and on different albums if you aren't specific enough

    **NOTE** no extra symbols are needed when typing the name of the song.
    * e.g. 
        1. CORRECT: apartment -or - apartment young the giant
        2. INCORRECT: "apartment" -or- "apartment young the giant"
        3. INCORRECT: < apartment > -or- < apartment young the giant >


    **Example 3**: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: The system will display information associated with the movie.

    **NOTE** no extra symbols are needed when typing the name of the movie.
    * e.g. 
        1. CORRECT: the prestige
        2. INCORRECT: "the prestige" 
        3. INCORRECT: < the prestige >


    **Example 4**: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file. 
    
- - -

## TECHNOLOGIES USED
* Javascript
* Nodejs
* Node packages:
    * Node-Spotify-API
    * Request
    * Moment
    * DotEnv
* APIs used:
    * Bands in Town
    * OMDB
* Git
* GitHub