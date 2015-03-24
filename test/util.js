var util = require('../src/util.js');
var shell = require('shelljs');

function encodeBase64(str) {
  return new Buffer(str).toString('base64');
}

describe('utilities', function() {
  'use strict';

  describe('unescapeStr()', function() {

    it('should unescape the funcy format correctly', function() {

      var _PREFIX = 'FRC';
      var rating = encodeBase64('5');
      var randomStr = 'kdjf73u=';

      var str = _PREFIX + rating + randomStr;

      expect(util.unescapeStr(str)).toBe('5');
    });

    it('should respond with 0 when its not possbile to unescape', function() {
      var str = encodeBase64('as');
      expect(util.unescapeStr(str)).toBe(0);
    });

  });

  describe('isGitRepo()', function() {

    it('should respond with true when it finds a git repo', function() {
      expect(util.isGitRepo(__dirname + '/../')).toBe(true);
    });

    it('should respond with false when doesn\'t find a git repo', function() {
      expect(util.isGitRepo(__dirname + '/')).toBe(false);
    });

  });

  describe('isFile()', function() {

    it('should respond with true when it finds a file', function() {
      expect(util.isFile(__dirname + '/util.js')).toBe(true);
    });

    it('should respond with false when it doesn\'t find a file', function() {
      expect(util.isFile(__dirname + '/util-2.js')).toBe(false);
    });
  });

  describe('isSymbolicLink()', function() {

    beforeEach(function() {
      shell.ln('-s', __dirname + '/util.js', __dirname + '/util-2.js');
    });

    it('should respond with true when it finds a symbolic link', function() {
      expect(util.isSymbolicLink(__dirname + '/util-2.js')).toBe(true);
    });

    it('should respond with false when it finds a symbolic link', function() {
      expect(util.isSymbolicLink(__dirname + '/util-3.js')).toBe(false);
    });

    afterEach(function() {
      shell.rm('-rf', __dirname + '/util-2.js');
    });

  });
});
