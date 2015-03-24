var inquirer = require('inquirer');

inquirer.prompt([{
  type: 'list',
  name: 'rating',
  message: 'What rating would you give for this commit?',
  choices: ['0', '1', '2', '3', '4', '5'],
  default: 3
}], function(answers) {
  process.exit(answers.rating);
});
