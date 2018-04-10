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

//TWITTER LOG DONE
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

                CONSOLEIT();
                LOGIT();
            }
        });


    } //closing if twit handle not specified

    // if a handle is speficied, show that user's tweets LOG DONE
    else {
        var params = { screen_name: value };

        client.get('statuses/user_timeline', params, function (error, tweets, response) {

            if (!error) {
                var j = 20;
                LOG.push(value + "'s 20 most recent tweets");

                for (i = 0; i < tweets.length; i++) {

                    LOG.push('========================================='
                        , 'Posted on: ' + tweets[i].created_at, '" ' + tweets[i].text + ' "');

                    j--;
                }
            }
            else {
                LOG.push("sorry, that username does not exist")
            }

            LOGIT();
            CONSOLEIT();
        });
    } //closing if a twit handle specified
}; //closing twooter

//SPOTIFY  LOG DONE
function SPOOTER() {

    //if a song is not specified, defualt to ace whatever
    if (typeof value === 'undefined') {

        spotify.search({ type: 'track', query: 'ace of base the sign' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            LOG.push("================================", 'Artist: ' + data.tracks.items[0].artists[0].name, 'Song Title: ' + data.tracks.items[0].name, 'Album: ' + data.tracks.items[0].album.name, 'Preview Link: ' + data.tracks.items[0].preview_url);
            CONSOLEIT();
            LOGIT();

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
                LOG.push("Your search yielded 0 results");
            } //close if search term yielded nothing

            //if search term does yield something
            else {

                //show the 5 most relevant results
                for (i = 0; i < data.tracks.items.length; i++) {
                    LOG.push("================================",'Artist: ' + data.tracks.items[i].artists[0].name,'Song Title: ' + data.tracks.items[i].name,'Album: ' + data.tracks.items[i].album.name,'Preview Link: ' + data.tracks.items[i].preview_url);
                }
            }//close if search term does yield result

            CONSOLEIT();
            LOGIT();
        });
    }; //closing if song is specified
   
}

//OMDB LOG DONE
function OMDBOOTER() {
    //if movie name is not entered
    if (typeof value === 'undefined') {

        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr.+Nobody" + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var allInfo = JSON.parse(body);
                // console.log(allInfo);
                LOG.push("===========================================","Movie Title: " + allInfo.Title,"Release Year: " + allInfo.Year,"IMDB Rating: " + allInfo.imdbRating,"Rotten Tomatoes Rating: " + allInfo.Ratings[1].Value,"Country: " + allInfo.Country,"Language: " + allInfo.Language,"Short Plot: " + allInfo.Plot,"Actors: " + allInfo.Actors);
            }
            CONSOLEIT();
            LOGIT();
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
                    LOG.push("Please enter a valid movie name");
                }

                //if there is a movie ACTUALLY JUST DONT OPEN THIS
                else {
                    //check for a rotten tomato 
                    for (i = 0; i < allInfo.Ratings.length; i++) {
                        if (allInfo.Ratings[i].Source === 'Rotten Tomatoes') {
                            var tomato = allInfo.Ratings[i].Value;
                        }
                    }

                    LOG.push("===========================================","Movie Title: " + allInfo.Title,"Release Year: " + allInfo.Year,"Actors: " + allInfo.Actors,"IMDB Rating: " + allInfo.imdbRating);

                    if (tomato != undefined) {
                        LOG.push("Rotten Tomatoes Rating: " + tomato);
                    }
                    else {
                        LOG.push("Rotten Tomatos Rating: N/A");
                    }

                    LOG.push("Country: " + allInfo.Country,"Language: " + allInfo.Language,"Short Plot: " + allInfo.Plot);
                }
                CONSOLEIT();
                LOGIT();
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

    var index = 0;
    //forces it to wait for line to be written first before moving onto next element in LOG
    function writeIt() {
        if (index < LOG.length) {
            fs.appendFile('log.txt', LOG[index++] + "\n", writeIt);
        }
    }

    writeIt();
}

//console log it
function CONSOLEIT() {
    for (i = 0; i < LOG.length; i++) {
        console.log(LOG[i]);
    };
}

