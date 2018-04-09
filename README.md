# LIRI-node-app HW ASSIGNMENT

## About LIRI
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Essentially just practicing using node.js API libraries to retrieve information 


## Commands

### Typing `node liri.js` will welcome the user and show all commands


1. Twitter
    * `node liri.js my-tweets` 
        * will show 20 most recent tweets by CodingCakez (My test twitter acount)
    * `node liri.js my-tweets <twitterhandle>` 
        * will show 20 most recent tweets by that specified username
        * if that user does not exist, it will display that
2. Spotify
    * `node liri.js spotify-this-song`
        * will show Artist, Song Title, Album name, and Preview link of the song "The Sign" by Ace of Base
    * `node liri.js spotify-this-song <searchquery>`
        * will show Artist, Song Title, Album name, and Preview link (if there is one) for the first 5 most relevant songs tracks to your search query.
        * if search query yields no results, it will tell the user that.
3. OMDB
    * `node liri.js movie-this`
        * will show Title, Year, Ratings, Country, Language, Actors, and Plot of "Mr. Nobdy"
    * `node liri.js movie-this <moviename>`
        * will show Title, Year, Ratings, Country, Language, Actors, and Plot of speficied movie
        * if invalid movie, it will say so.


* `do-what-it-says`