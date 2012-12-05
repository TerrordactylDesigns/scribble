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
  this.api_key    = api_key;
  this.api_secret = api_secret;
  this.username   = username;
  this.password   = password;
};
/**/// Public: Scrobble
/**///
/**/// Args
/**/// song - the_arg_value
/**///
/**/// Returns
/**/// return - the_return_value
Scrobbler.prototype.Scrobble = function(song) {

};

module.exports = Scrobbler;