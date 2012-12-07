/**/// GLOBALS
var http        = require('http')
  , crypto      = require('crypto')
  , querystring = require('querystring');
/**/// Public: Scribble
/**///
/**/// Args
/**/// api_key    - Last.fm API account key
/**/// api_secret - Last.fm API secret
/**/// username   - Last.fm account
/**/// password   - Last.fm password
/**///
/**/// Returns
/**/// return     - A scribble
var Scribble = function(api_key, api_secret, username, password) {
  this.apiKey     = api_key;
  this.apiSecret  = api_secret;
  this.username   = username;
  this.password   = password;
  this.sessionKey = null;
};
/**/// Public: Post Scrobble
/**///
/**/// Args
/**/// song - song object. artist, track keys
/**/// sk   - authenticated session key
/**///
/**/// Returns
/**/// return - xml response from scrobble
Scribble.prototype.postScrobble = function(song, sk) {
  if (sk && this.sessionKey == null) {
    this.sessionKey = sk;
  }
  var path = ''
    , now = new Date().getTime()
    , timestamp = Math.floor(now /1000)
    , token       = makeHash(this.username + makeHash(this.password))
    , apiSig     = makeHash('api_key' + this.apiKey + 'artist' + song.artist + 'methodtrack.scrobblesk' + this.sessionKey + 'timestamp' + timestamp + 'track' + song.track + this.apiSecret)
    , post_data = querystring.stringify({
        method: 'track.scrobble',
        api_key: this.apiKey,
        sk: this.sessionKey,
        api_sig: apiSig,
        timestamp: timestamp,
        artist: song.artist,
        track: song.track
      })
    , post_options = {
        host: 'ws.audioscrobbler.com',
        path: '/2.0/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
      }
    , sendScrobble = http.request(post_options, function(request) {
        var reqReturn = '';
        request.setEncoding('utf8');
        request.on('data', function(chunk) {
          reqReturn += chunk;
        });
        request.on('end', function() {
          console.log('[SCROBBLE RESPONSE] : '+reqReturn);
        });
      }).on('error', function(err) {
        // TODO
      });
  sendScrobble.write(post_data);
  sendScrobble.end();
}
/**/// Public: Scrobble
/**///
/**/// Args
/**/// song - song object. artist, track keys
Scribble.prototype.Scrobble = function(song) {
  if (this.sessionKey == null) {
    var self = this;
    this.MakeSession(function(sk) {
      self.postScrobble(song,sk);
    });
  } else {
    this.postScrobble(song)
  }
};
/**/// Public: Make session key
/**///
/**/// Args
/**/// callback - optional callback function
/**///
/**/// Returns
/**/// return - a session key and optional callback
Scribble.prototype.MakeSession = function(callback) {
  var token   = makeHash(this.username + makeHash(this.password))
    , apiSig  = makeHash('api_key' + this.apiKey + 'authToken' + token + 'methodauth.getMobileSessionusername' + this.username + this.apiSecret)
    , path    = '/2.0/?method=auth.getMobileSession&' +
                'username=' + this.username + '&' +
                'authToken=' + token + '&' +
                'api_key=' + this.apiKey + '&' +
                'api_sig=' + apiSig + '&format=json'
    , callResponse = ''
    , callValues   =  {
                        host: 'ws.audioscrobbler.com',
                        port: 80,
                        path: path
                      };
  http.get(callValues, function(response) {
    response.on('data', function(chunk) {
      callResponse += chunk
    });
    response.on('end', function() {
      var test = JSON.parse(callResponse);
      this.sessionKey = test.session.key;
      if (typeof(callback) == 'function') {
        callback(test.session.key);
      }
    });
  }).on('error', function(err) {
    // TODO
  });
};
/**/// Public: Now Playing
/**///
/**/// Args
/**/// song - song object. artist, track keys
Scribble.prototype.NowPlaying = function(song) {
  // TODO
};
/**/// Public: Make MD5 hashes
/**///
/**/// Args
/**/// input - string input to hash
/**///
/**/// Returns
/**/// return - md5 hash of the input string
function makeHash(input) {
  return crypto.createHash('md5').update(input, 'utf8').digest("hex");
}

module.exports = Scribble;