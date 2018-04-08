require("dotenv").config();

//require things
var Twitter = require("twitter");

var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


//STEP 9
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var value = process.argv[3];

// if there is no command, welcome the user
if (process.argv.length === 2) {
    console.log("Hi, welcome to LIRI. Please enter one of the following commands:");
    console.log("my-tweets along with a twitter handle to see that user's 20 most recent tweets. If you do not enter a handle, you will see CodingCakez's 20 most recent tweets.");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("do-what-it-says");
} //closing if there is no command.F

//if there is a command, then do the do
else {

    //if the command is my tweets
    if (command === 'my-tweets') {

        //if a twitter handle is not specified, show CodingCakez's tweets
        if (typeof process.argv[3] === 'undefined') {

            console.log("CodingCakez's 20 most recent tweets");
            var params = { screen_name: 'CodingCakez' };

            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    var j = 20;
                    for (i = 0; i < tweets.length; i++) {
                        console.log('=========================================');
                        console.log('Posted on: ' + tweets[i].created_at);
                        console.log('" ' + tweets[i].text + ' "');

                        j--;
                    }
                }
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
    } //closing if my-tweets

    //if user types spotyisgdohsjdfkkg
    else if (command === 'spotify-this-song') {
        console.log("spotify this song")
    } //closing else if spotify

    //if user types movie this
    else if (command === 'movie-this') {
        console.log("movie-this");
    } //closing else if movie this

    //if user types do what it says
    else if (command === 'do-what-it-says') {
        console.log("do-what-it-says");
    } //closing elseif do what it says
    
    //if user types something funky
    else {
        console.log("Sorry, that is not a valid LIRI command. Please enter one of the following:");
        console.log("my-tweets");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");
    }//closing if user types invalid command

} //closing if there is a command