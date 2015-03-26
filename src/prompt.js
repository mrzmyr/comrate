#!/usr/bin/env node

var inquirer = require('inquirer');
var fs = require('fs');

var util = require('./util');

var commitMsgFile = process.argv[2];
var commitMsg = fs.readFileSync(commitMsgFile, 'utf-8');

inquirer.prompt([{
  type: 'list',
  name: 'rating',
  message: 'What fun rating would you give for this commit?',
  choices: ['0', '1', '2', '3', '4', '5'],
  default: 3
}], function(answers) {
  if(answers.rating === undefined) {
    process.exit(1);
  }

  var encrypedRating = util.escapeRating(answers.rating);
  var newCommitMsg = commitMsg + '\n\n' + encrypedRating;

  fs.writeFileSync(commitMsgFile, newCommitMsg);

  process.exit(0);
});
