/**/// GLOBALS
var http = require('http');

/**/// Public: Scrobbler
/**///
/**/// Args
/**/// api_key    - the_arg_value
/**/// api_secret - the_arg_value
/**/// username   - the_arg_value
/**/// password   - the_arg_value
/**///
/**/// Returns
/**/// return     - the_return_value
var Scrobbler = function(api_key, api_secret, username, password) {
  this.apiKey     = api_key;
  this.apiSecret  = api_secret;
  this.username   = username;
  this.password   = password;
  this.sessionKey = null;
  this.apiSig     = null;
};
/**/// Public: Scrobble
/**///
/**/// Args
/**/// song - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
Scrobbler.prototype.Scrobble = function(song) {
  // TODO
};
/**/// Public: Now Playing
/**///
/**/// Args
/**/// song - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
Scrobbler.prototype.NowPlaying = function(song) {
  // TODO
};
/**/// Public: Create
/**///
/**/// Args
/**/// arg1 - the_arg_value
/**/// arg2 - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
Scrobbler.prototype.MakeSession = function() {
  // TODO
};
/**/// Public: Call GET API
/**///
/**/// Args
/**/// path - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
function getAPI(path) {
  var callResponse = ''
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
      return JSON.parse(callResponse);
    });
  }).on('error', function(err) {
    // TODO
  });
}
/**/// Public: Call POST API
/**///
/**/// Args
/**/// path - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
function postAPI(path) {
  var callValues =  {
                      host: 'ws.audioscrobbler.com',
                      port: 80,
                      method: 'POST',
                      path: path
                    };
  http.request(callValues, function(request) {
    request.setEncoding('utf8');
    request.on('data', function(chunk) {
      // TODO
      return true;
    });
  }).on('error', function(err) {
    // TODO
  });
}
/**/// Public: Make MD5 hashes
/**///
/**/// Args
/**/// input - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
function makeHash(input) {
  return crypto.createHash('md5').update(string, 'utf8').digest("hex");
}

module.exports = Scrobbler;