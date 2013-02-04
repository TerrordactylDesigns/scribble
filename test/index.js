/*
  GLOBALS
*/
var scribble  = require('../index')
  , nock      = require('nock')
  , should    = require('should')
  , crypto    = require('crypto')

//nock.recorder.rec()
/*
  FUNCTIONS
*/
/**/// Private: Make MD5 hashes
/**///
/**/// Args
/**/// input - string input to hash
/**///
/**/// Returns
/**/// return - md5 hash of the input string
function makeHash(input) {
  return crypto.createHash('md5').update(input, 'utf8').digest("hex")
}
/*
  TESTS
*/
describe('[Object creation] :', function() {
  var scrobbler = new scribble('a','a','a','a')
  // 1
  it('Should create an object with 5 properties', function() {
    scrobbler.apiKey.should.equal('a')
    scrobbler.apiSecret.should.equal('a')
    scrobbler.username.should.equal('a')
    scrobbler.password.should.equal('a')
    scrobbler.should.have.property('sessionKey')
  })
  // 2
  it('Should start with a null sessionKey', function() {
    should.not.exist(scrobbler.sessionKey)
  })
}) // [Object creation]

describe('[MakeSession] :', function() {
  var scrobbler = new scribble('a','a','a','a')
    , token   = makeHash('a' + makeHash('a'))
    , apiSig  = makeHash('api_keyaauthToken' + token + 'methodauth.getMobileSessionusernameaa')
  // 3
  it('Should start with a null sessionKey', function() {
    should.not.exist(scrobbler.sessionKey)
  })
  // 4
  it('Should end with a sessionKey', function(done) {
    /*
      nock.recorder.rec() output:
    
      nock('http://ws.audioscrobbler.com:80')
      .get('/2.0/?method=auth.getMobileSession&username=a&authToken=e35bce2719cee48819fe422c51bec259&api_key=a&api_sig=99cad30a83f2c090f2d3de9d80fcaabe&format=json')
      .reply(200, "{\"session\":{\"name\":\"GodOfThisAge\",\"key\":\"HERESTHEKEYRETURN\",\"subscriber\":\"0\"}}\n", { date: 'Mon, 04 Feb 2013 00:17:11 GMT',
      server: 'Apache/2.2.22 (Unix)',
      'x-web-node': 'www198',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, GET, OPTIONS',
      'access-control-max-age': '86400',
      'cache-control': 'no-cache, must-revalidate',
      expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
      'content-length': '94',
      connection: 'close',
      'content-type': 'application/json; charset=utf-8;' })
    */
    nock('http://ws.audioscrobbler.com:80')
      .get('/2.0/?method=auth.getMobileSession&username=a&authToken=e35bce2719cee48819fe422c51bec259&api_key=a&api_sig=99cad30a83f2c090f2d3de9d80fcaabe&format=json')
      .reply(200, "{\"session\":{\"name\":\"GodOfThisAge\",\"key\":\"sweetkeybro\",\"subscriber\":\"0\"}}\n", {})
    scrobbler.MakeSession(function(key) {
      should.exist(key)
      key.should.equal('sweetkeybro')
      done()
    })
  })
}) // [MakeSession]

describe('[Love]', function() {
  var scrobbler = new scribble('a','a','a','a')
    , song      = { artist: '', track: '' }
}) // [Love]