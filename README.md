#Scribble
###Simple Last.fm scrobbler for node.js

#####Scribble down the song

###PreReqs

Get a last.fm API account and save the api key, api secret, and your username and password.

###Install
    npm install scribble

###Use it

    var scribble = require('scribble');
    var Scrobbler = new scribble('your_api_key','your_api_secret','your_lastfm_username','your_lastfm_password');
    var song = {
      artist: 'Slayer',
      track: 'Disciple'
    };
    Scrobbler.Scrobble(song);

##F * A * Q

* Q: This isnt working
* A: Sorry....
***
* Q: Why doesn't it do now playing?
* A: It will.