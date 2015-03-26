#!/usr/bin/env node

var program = require('commander');
var lib = require('./lib');
var pkg = require('../package.json');

var _DEFAULT_DIR = './';

program
  .version(pkg.version)
  .option("-d, --dir [directory]", "Git repository directory")
  .option("-v, --verbose", "Log verbose");

program
  .command('stats')
  .alias('s')
  .description('Show stats for git repository')
  .option("-d, --dir [directory]", "Git repository directory")
  .action(function(options) {
    var dir = options.dir || _DEFAULT_DIR;

    var statsData = lib.getStats(dir);
    lib.printStats(statsData);
  });

program
  .command('enable')
  .description('Enable fun rating for current directory')
  .option("-d, --dir [directory]", "Git repository directory")
  .action(function (options) {
    var dir = options.dir || _DEFAULT_DIR;
    lib.linkHooks(dir);
  });

program
  .command('disable')
  .description('Disable fun rating for current directory')
  .option("-d, --dir [directory]", "Git repository directory")
  .action(function (options) {
    var dir = options.dir || _DEFAULT_DIR;
    lib.unlinkHooks(dir);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
