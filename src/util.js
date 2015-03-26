var fs = require('fs');
var shell = require('shelljs');
var chalk = require('chalk');

var _PREFIX = 'FRC';

function encodeBase64(str) {
  return new Buffer(str).toString('base64');
}

function decodeBase64(str) {
  return new Buffer(str, 'base64').toString('utf8');
}

function escapeRating(rating) {

  // generate 8 random charaters string
  // http://stackoverflow.com/a/8084248/237209
  var randomStr = Math.random().toString(36).substring(10);

  var cryptedRating = encodeBase64(rating + randomStr);

  return _PREFIX + cryptedRating;
}

function unescapeRating(escapedRating) {

  str = escapedRating.replace(_PREFIX, '');


  // remove last 8 chars
  str = decodeBase64(str, 'base64')[0];

  str = str.replace('\n', '');

  if(!isNaN(str)) {
    return parseInt(str);
  } else {
    return 0;
  }
}

function getCommitMessages(dir) {
  return shell
    .exec('git -C "' + dir + '" log -20 --pretty=%B', { silent: true }).output
    .split('\n\n')
    .filter(function (msg) {
      return msg.indexOf(_PREFIX) !== -1;
    })
    .reverse();
}

function isFile(file) {
  try {
    return fs.lstatSync(file).isFile();
  } catch(e) {
    return false;
  }
}

function isSymbolicLink(file) {
  try {
    return fs.lstatSync(file).isSymbolicLink();
  } catch(e) {
    return false;
  }
}

function isGitRepo(dir) {
  try {
    return fs.lstatSync(dir + '.git').isDirectory();
  } catch(e) {
    return false;
  }
}

function printError(str) {
  console.log('\n', chalk.bold.red('Error:'), str);
}

function printSuccess(str) {
  console.log('\n', chalk.bold.green('Success:'), str);
}

function printInfo(str) {
  console.log('\n', chalk.bold.cyan('Info:'), str);
}

module.exports = {
  escapeRating: escapeRating,
  unescapeRating: unescapeRating,
  getCommitMessages: getCommitMessages,
  isSymbolicLink: isSymbolicLink,
  isFile: isFile,
  isGitRepo: isGitRepo,
  printError: printError,
  printSuccess: printSuccess,
  printInfo: printInfo
}
