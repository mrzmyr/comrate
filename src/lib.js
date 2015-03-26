var path = require('path');
var shell = require('shelljs');
var babar = require('babar');

var pkg = require('../package.json');
var util = require('./util');

var srcCommitMsg = path.join(__dirname, '/commit-msg');

var srcRating = path.join(__dirname, '/prompt.js');
var destRating = path.join('./.git/hooks/prompt.js');

function linkHooks(dir, verbose) {
  var destCommitMsg = path.join(dir, '.git/hooks/commit-msg');

  if(!util.isGitRepo(dir)) {
    util.printError(pkg.name + ' needs a git repository to work enable on.');
    return;
  }

  if(util.isFile(destCommitMsg)) {
    util.printError(
      pkg.name + ' can\'t be enabled on project that already ' +
      'have a commit-msg git hook installed (' + destCommitMsg + ')'
    );
    return;
  }

  if(
    util.isSymbolicLink(destCommitMsg) &&
    util.isSymbolicLink(destRating)
  ) {
    util.printInfo(pkg.name + ' is already enabled');
    return;
  }

  if(verbose) {
    util.printInfo('Symlink ' + srcCommitMsg + ' -> ' + destCommitMsg)
    util.printInfo('Symlink ' + srcRating + ' -> ' + destRating)
  }

  shell.ln('-s', srcCommitMsg, destCommitMsg);
  shell.ln('-s', srcRating, destRating);

  util.printSuccess(pkg.name + ' is enabled now.')
}

function unlinkHooks(dir, verbose) {
  var destCommitMsg = path.join(dir, '.git/hooks/commit-msg');

  if(
    !util.isSymbolicLink(destCommitMsg) ||
    !util.isSymbolicLink(destRating)
  ) {
    util.printError(pkg.name + ' is not enabled on this git repository.');
    return;
  }

  if(verbose) {
    util.printInfo('Remove Symlink', destCommitMsg)
    util.printInfo('Remove Symlink', destRating)
  }

  shell.rm('-f', destCommitMsg);
  shell.rm('-f', destRating);

  util.printSuccess(pkg.name + ' is disabled now.');
}

function getStats(dir) {

  var ratingArr = [];
  var commitMessges = util.getCommitMessages(dir);

  commitMessges.forEach(function (msg, index) {
    var rating = util.unescapeRating(msg);
    ratingArr.push([index, rating]);
  });

  return ratingArr;
}

function printStats(data) {

  if(data.length <= 3) {
    util.printError(pkg.name + ' needs at least 3 rated commits');
    return;
  }

  console.log(babar(data));
}

module.exports = {
  linkHooks: linkHooks,
  unlinkHooks: unlinkHooks,
  getStats: getStats,
  printStats: printStats
}
