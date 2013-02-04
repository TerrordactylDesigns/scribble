/*
  GLOBALS
*/
var scribble  = require('../index')
  , nock      = require('nock')
  , should    = require('should')
  , crypto    = require('crypto')
  , song      = { artist: 'Slayer', track: 'Disciple' }

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

/*
  POSTS
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
  it('Should end with a sessionKey', function(endTest) {
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
      endTest()
    })
  })
}) // [MakeSession]

describe('[Love]', function() {
  var scrobbler = new scribble('a','a','a','a')
}) // [Love]

describe('[Scrobble]', function() {
  var scrobbler = new scribble('a','a','a','a')
    , apiSig    = makeHash('api_keyaartist' + song.artist + 'methodtrack.scrobblesksweetkeybrotimestamp1359941414track' + song.track + 'a')

  // 412aaebbf778278ade9f4d766da11721
  // mock key request
  nock('http://ws.audioscrobbler.com:80')
      .get('/2.0/?method=auth.getMobileSession&username=a&authToken=e35bce2719cee48819fe422c51bec259&api_key=a&api_sig=99cad30a83f2c090f2d3de9d80fcaabe&format=json')
      .reply(200, "{\"session\":{\"name\":\"GodOfThisAge\",\"key\":\"sweetkeybro\",\"subscriber\":\"0\"}}\n", {})
  // mock post request
  nock('http://ws.audioscrobbler.com:80')
  .post('/2.0/', "method=track.scrobble&api_key=a&sk=sweetkeybro&api_sig=412aaebbf778278ade9f4d766da11721&timestamp=1359941414&artist=Slayer&track=Disciple")
  .reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lfm status=\"ok\">\n<scrobble>\n    <track corrected=\"0\">Disciple</track>\n    <artist corrected=\"0\">Slayer</artist>\n    <album corrected=\"0\"></album>\n    <albumArtist corrected=\"0\"></albumArtist>\n    <ignoredMessage code=\"0\"></ignoredMessage>\n</nowplaying></lfm>\n", { date: 'Mon, 04 Feb 2013 01:04:34 GMT',
  server: 'Apache/2.2.22 (Unix)',
  'x-web-node': 'www216',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-max-age': '86400',
  'content-length': '301',
  connection: 'close',
  'content-type': 'text/xml; charset=utf-8;' })


  // it('Should auto generate a key and return the post response', function(endTest) {
  //   scrobbler.Scrobble(song, function(ret) {
  //     ret.should.not.equal('')
  //     ret.should.equal("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lfm status=\"ok\">\n<scrobble>\n    <track corrected=\"0\">Disciple</track>\n    <artist corrected=\"0\">Slayer</artist>\n    <album corrected=\"0\"></album>\n    <albumArtist corrected=\"0\"></albumArtist>\n    <ignoredMessage code=\"0\"></ignoredMessage>\n</nowplaying></lfm>\n")
  //     endTest()
  //   })
  // })
}) // [Scrobble]

describe('[Now Playing]', function() {
  var scrobbler = new scribble('a','a','a','a')
    , apiSig  = makeHash('api_keyaartistSlayermethodtrack.updateNowPlayingsksweetkeybrotrackDisciplea')
  // mock key request
  nock('http://ws.audioscrobbler.com:80')
      .get('/2.0/?method=auth.getMobileSession&username=a&authToken=e35bce2719cee48819fe422c51bec259&api_key=a&api_sig=99cad30a83f2c090f2d3de9d80fcaabe&format=json')
      .reply(200, "{\"session\":{\"name\":\"GodOfThisAge\",\"key\":\"sweetkeybro\",\"subscriber\":\"0\"}}\n", {})
  // mock post request
  nock('http://ws.audioscrobbler.com:80')
  .post('/2.0/', "method=track.updateNowPlaying&api_key=a&sk=sweetkeybro&api_sig=fae2ed6a254ac0f07cc838f3d676d0ab&artist=Slayer&track=Disciple")
  .reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lfm status=\"ok\">\n<nowplaying>\n    <track corrected=\"0\">Disciple</track>\n    <artist corrected=\"0\">Slayer</artist>\n    <album corrected=\"0\"></album>\n    <albumArtist corrected=\"0\"></albumArtist>\n    <ignoredMessage code=\"0\"></ignoredMessage>\n</nowplaying></lfm>\n", { date: 'Mon, 04 Feb 2013 01:04:34 GMT',
  server: 'Apache/2.2.22 (Unix)',
  'x-web-node': 'www216',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-max-age': '86400',
  'content-length': '301',
  connection: 'close',
  'content-type': 'text/xml; charset=utf-8;' })

/*
  nock('http://ws.audioscrobbler.com:80')
  .post('/2.0/', "method=track.updateNowPlaying&api_key=a8b2277c27ee94609c3fe266b533e74c&sk=ebbf9d4329ecdc403ffdfb37838b5c1d&api_sig=82e1aef36525b5206018ffb3fda11867&artist=Slayer&track=Disciple")
  .reply(200, "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lfm status=\"ok\">\n<nowplaying>\n    <track corrected=\"0\">Disciple</track>\n    <artist corrected=\"0\">Slayer</artist>\n    <album corrected=\"0\"></album>\n    <albumArtist corrected=\"0\"></albumArtist>\n    <ignoredMessage code=\"0\"></ignoredMessage>\n</nowplaying></lfm>\n", { date: 'Mon, 04 Feb 2013 01:04:34 GMT',
  server: 'Apache/2.2.22 (Unix)',
  'x-web-node': 'www216',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
  'access-control-max-age': '86400',
  'content-length': '301',
  connection: 'close',
  'content-type': 'text/xml; charset=utf-8;' });
*/

  it('Should auto generate a key and return the post response', function(endTest) {
    scrobbler.NowPlaying(song, function(ret) {
      ret.should.not.equal('')
      ret.should.equal("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lfm status=\"ok\">\n<nowplaying>\n    <track corrected=\"0\">Disciple</track>\n    <artist corrected=\"0\">Slayer</artist>\n    <album corrected=\"0\"></album>\n    <albumArtist corrected=\"0\"></albumArtist>\n    <ignoredMessage code=\"0\"></ignoredMessage>\n</nowplaying></lfm>\n")
      endTest()
    })
  })
}) // [Now Playing]

/*
  GETS
*/
describe('[Album]', function() {
  it('should return the album from a properly formed song object in their database', function(endTest) {
    // mock request
    nock('http://ws.audioscrobbler.com:80')
        .get('/2.0/?method=track.getInfo&artist=' + song.artist + '&api_key=a&track=' + song.track + '&format=json')
        .reply(200, "{\"track\":{\"album\":{\"title\":\"God Hates Us All\"}}}\n", {})

    var scrobbler = new scribble('a','a','a','a')
      //, album     = 

    scrobbler.GetAlbum(song, function(ret) {
      ret.track.album.title.should.equal('God Hates Us All')
      endTest()
    })
  })
}) // [Album]