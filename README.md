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
// Now Playing
Scrobbler.NowPlaying(song);
// Scrobble
Scrobbler.Scrobble(song);
// Love
Scrobbler.Love(song);
```
