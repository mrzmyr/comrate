var util = require('../src/util.js');
var shell = require('shelljs');

function encodeBase64(str) {
  return new Buffer(str).toString('base64');
}

function decodeBase64(str) {
  return new Buffer(str, 'base64').toString('utf8');
}

describe('utilities', function() {
  'use strict';

  describe('unescapeRating()', function() {

    it('should unescape format correctly', function() {
      var crypedRating = util.escapeRating(5);
      expect(util.unescapeRating(crypedRating)).toBe(5);
    });

    it('should respond with 0 when its not possbile to unescape', function() {
      var str = encodeBase64('as');
      expect(util.unescapeRating(str)).toBe(0);
    });

  });

  describe('escapeRating()', function() {

    it('should escape format correctly', function() {
      var crypedRating = util.escapeRating(5);
      var rating = decodeBase64(crypedRating.substr(3, crypedRating.length - 1))[0];

      expect(rating).toBe('5');
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
