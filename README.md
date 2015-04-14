#Scribble
###Simple Last.fm scrobbler for node.js

#####Scribble down the song

[![Build Status](https://travis-ci.org/TerrordactylDesigns/scribble.png?branch=master)](https://travis-ci.org/TerrordactylDesigns/scribble)

###PreReqs

Get a last.fm API account and save the api key, api secret, and your username and password.

###Install
    npm install scribble

###Use it

```JavaScript
var scribble = require('scribble');
// Build your scrobbler using your API keys and user info (optionally use 'true' as the last argument to enable console logging)
var Scrobbler = new scribble('your_api_key','your_api_secret','your_lastfm_username','your_lastfm_password');
// Make a song object in your app
var song = {
  artist: 'Slayer',
  track: 'Disciple',
  album: 'God Hates Us All' // Only needed for album info call
};

/*
  POST methods
  All return the XML response from the POST requesta
*/
// Now Playing
Scrobbler.NowPlaying(song, function(post_return_data) {});
// Scrobble
Scrobbler.Scrobble(song, function(post_return_data) {});
// Love
Scrobbler.Love(song, function(post_return_data) {});

/*
  GET methods
  All return the parsed JSON response from Last.fm
*/
// Get Album
Scrobbler.GetAlbum(song, function(ret) {});
// Get Artist Info
Scrobbler.GetArtistInfo(song.artist, function(ret) {});
// Get Similar Artists
Scrobbler.GetSimilarArtists(song.artist, function(ret) {}, optional_return_amount_defaults_to_50);
// Get Artist Events
Scrobbler.GetArtistEvents(song.artist, function(ret) {}, optional_return_amount_defaults_to_50);
// Get Artist Top Albums
Scrobbler.GetTopAlbums(song.artist, function(ret) {}, optional_return_amount_defaults_to_50);
// Get Artist Top Tracks
Scrobbler.GetArtistTopTracks(song.artist, function(ret) {}, optional_return_amount_defaults_to_50);
// Get Similar Songs
Scrobbler.GetSimilarSongs(song, function(ret) {}, optional_return_amount_defaults_to_50);
// Get Track Info
Scrobbler.GetTrackInfo(song, function(ret) {});
// Get Album Info
Scrobbler.GetAlbumInfo(song, function(ret) {});
```
###Tests

    npm install
    make test
    or
    npm test
