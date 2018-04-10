require("dotenv").config();

//require things
var request = require("request");
var fs = require("fs");
//STEP 9
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//more variables
var command = process.argv[2];
var value = process.argv[3];
var LOG = [];

// if there is no command, welcome the user
if (process.argv.length === 2) {
    LOG.push("Hi, welcome to LIRI. Please enter one of the following commands:");
    LOG.push("my-tweets along with a twitter handle to see that user's 20 most recent tweets. If you do not enter a handle, you will see CodingCakez's 20 most recent tweets.");
    LOG.push("spotify-this-song");
    LOG.push("movie-this");
    LOG.push("do-what-it-says");
    CONSOLEIT();
    LOGIT();
} //closing if there is no command.F

//if there is a command, then do the do
else {

    //if the command is my tweets
    if (command === 'my-tweets') {
        TWOOTER();
    } //closing if my-tweets

    //if user types spotyisgdohsjdfkkg
    else if (command === 'spotify-this-song') {
        SPOOTER();
    } //closing else if spotify

    //if user types movie this
    else if (command === 'movie-this') {
        OMDBOOTER();
    } //closing else if movie this

    //if user types do what it says
    else if (command === 'do-what-it-says') {
        console.log("do-what-it-says");
        //this will only work if theres only one command in there, separated by a comma.
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");
            value = dataArr[1];

            if (dataArr[0] === 'my-tweets') {
                TWOOTER();
            }
            else if (dataArr[0] === 'spotify-this-song') {
                SPOOTER();
            }
            else if (dataArr[0] === 'movie-this') {
                OMDBOOTER();
            }

        });//closing read file

    } //closing elseif do what it says

    //if user types something funky
    else {
        LOG.push("Sorry, " + process.argv[2] + " is not a valid LIRI command. Please enter one of the following:");
        LOG.push("my-tweets");
        LOG.push("spotify-this-song");
        LOG.push("movie-this");
        LOG.push("do-what-it-says");
        LOG.push("Please refer to the README.md for more help.");
        CONSOLEIT();
        LOGIT();
    }//closing if user types invalid command

} //closing if there is a command







///////FUNCTIONS HAVE TO BE OUTSIDE BECAUSE OF THE STUPID DO-WHAT-IT-SAYS
//TWITTER
function TWOOTER() {

    //if a twitter handle is not specified, show CodingCakez's tweets
    if (typeof value === 'undefined') {
        LOG.push("CodingCakez's 20 most recent tweets");
        var params = { screen_name: 'CodingCakez' };

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                var j = 20;
                for (i = 0; i < tweets.length; i++) {
                    LOG.push('=========================================',
                        'Posted on: ' + tweets[i].created_at,
                        '" ' + tweets[i].text + ' "');

                    j--;
                }
            }
            CONSOLEIT();
            LOGIT();
        });


    } //closing if twit handle not specified

    // if a handle is speficied, show that user's tweets
    else {
        var params = { screen_name: value };

        client.get('statuses/user_timeline', params, function (error, tweets, response) {

            if (!error) {
                var j = 20;
                console.log(value + "'s 20 most recent tweets");

                for (i = 0; i < tweets.length; i++) {

                    console.log('=========================================');
                    console.log('Posted on: ' + tweets[i].created_at);
                    console.log('" ' + tweets[i].text + ' "');

                    j--;
                }
            }
            else {
                console.log("sorry, that username does not exist")
            }


        });
    } //closing if a twit handle specified
    // LOGIT();
}; //closing twooter
//SPOTIFY
function SPOOTER() {

    //if a song is not specified, defualt to ace whatever
    if (typeof value === 'undefined') {

        spotify.search({ type: 'track', query: 'ace of base the sign' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("================================");
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);

        });

    } //closing if song is not specified

    //if a song IS specifieded do the do
    else {

        spotify.search({ type: 'track', query: value, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //if the search time yields nothing
            if (data.tracks.total === 0) {
                console.log("Your search yielded 0 results");
            } //close if search term yielded nothing

            //if search term does yield something
            else {

                //show the 5 most relevant results
                for (i = 0; i < data.tracks.items.length; i++) {
                    console.log("================================");
                    console.log('Artist: ' + data.tracks.items[i].artists[0].name);
                    console.log('Song Title: ' + data.tracks.items[i].name);
                    console.log('Album: ' + data.tracks.items[i].album.name);
                    console.log('Preview Link: ' + data.tracks.items[i].preview_url);
                }
            }//close if search term does yield result
        });
    }; //closing if song is specified
}

//OMDB
function OMDBOOTER() {
    //if movie name is not entered
    if (typeof value === 'undefined') {

        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr.+Nobody" + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var allInfo = JSON.parse(body);
                // console.log(allInfo);
                console.log("===========================================");
                console.log("Movie Title: " + allInfo.Title);
                console.log("Release Year: " + allInfo.Year);
                console.log("IMDB Rating: " + allInfo.imdbRating);
                console.log("Rotten Tomatoes Rating: " + allInfo.Ratings[1].Value);
                console.log("Country: " + allInfo.Country);
                console.log("Language: " + allInfo.Language);
                console.log("Short Plot: " + allInfo.Plot);
                console.log("Actors: " + allInfo.Actors);
            }
        });
    } //close if movie name is not entered

    //if movie name is entered
    else {
        //do the call
        var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            var allInfo = JSON.parse(body);

            // If the request is successful
            if (!error && response.statusCode === 200) {

                //if there no movie,
                if (allInfo.Response === 'False') {
                    console.log("Please enter a valid movie name");
                }

                //if there is a movie ACTUALLY JUST DONT OPEN THIS
                else {
                    //check for a rotten tomato 
                    for (i = 0; i < allInfo.Ratings.length; i++) {
                        if (allInfo.Ratings[i].Source === 'Rotten Tomatoes') {
                            var tomato = allInfo.Ratings[i].Value;
                        }
                    }

                    console.log("===========================================");
                    console.log("Movie Title: " + allInfo.Title);
                    console.log("Release Year: " + allInfo.Year);
                    console.log("Actors: " + allInfo.Actors);
                    console.log("IMDB Rating: " + allInfo.imdbRating);

                    if (tomato != undefined) {
                        console.log("Rotten Tomatoes Rating: " + tomato);
                    }
                    else {
                        console.log("Rotten Tomatos Rating: N/A");
                    }

                    console.log("Country: " + allInfo.Country);
                    console.log("Language: " + allInfo.Language);
                    console.log("Short Plot: " + allInfo.Plot);
                }
            }
        });
    }// close if movie name is entered

}



///WRITE INTO LOG.TXT
function LOGIT() {
    fs.appendFile('log.txt', "*************************************************************************************\n", function (err) {
        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }
    });
    for (i = 0; i < LOG.length; i++) {
        fs.appendFile('log.txt', LOG[i] + "\n", function (err) {
            // If an error was experienced we say it.
            if (err) {
                console.log(err);
            }
        });

    };
}

//console log it
function CONSOLEIT() {
    for (i = 0; i < LOG.length; i++) {
        console.log(LOG[i]);
    };
}

