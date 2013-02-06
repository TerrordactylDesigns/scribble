#Scribble
###Simple Last.fm scrobbler for node.js

#####Scribble down the song

###PreReqs

Get a last.fm API account and save the api key, api secret, and your username and password.

###Install
    npm install scribble

###Use it

```JavaScript
var scribble = require('scribble');
// Build your scrobbler using your API keys and user info
var Scrobbler = new scribble('your_api_key','your_api_secret','your_lastfm_username','your_lastfm_password');
// Make a song object in your app
var song = {
  artist: 'Slayer',
  track: 'Disciple'
};

/*
  POST methods
*/
// Now Playing
Scrobbler.NowPlaying(song, function(post_return_data) {});
// Scrobble
Scrobbler.Scrobble(song, function(post_return_data) {});
// Love
Scrobbler.Love(song, function(post_return_data) {});

/*
  GET methods
*/
// Get Album
Scrobbler.GetAlbum(song, function(album) {});
// Get Artist Info
Scrobbler.GetArtistInfo(song.artist, function(info) {});
// Get Similar Artists
Scrobbler.GetSimilarArtists(song.artist, function(artistArray) { //artistArray is an array of artist names }, optional_return_amount_defaults_to_3);
// Get Similar Songs
Scrobbler.GetSimilarSongs(song, function(songArray) { //songArray is an array of song objects }, optional_return_amount_defaults_to_3);
```
