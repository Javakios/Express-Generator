
// APP TEMPLATE 
const appTemplate = require('./lib/templates/app.template');

//COMMAND
const commad = require('./lib/commands/execute.command').executeCommand;

// GENERATORS
const createDirectory = require('./lib/generators/create_directory.generator');
const createFile = require('./lib/generators/create_file.generator');

// MAIN FUNCTION 
const main = async () => {

    const projectName = process.argv[2];

    if (!projectName) {
        console.log('Please provide a project name.');
        return;
    }
    console.log(`Creating Express.js project: ${projectName}`);

    //create project directory
    createDirectory(projectName)

    // Navigate to the project directory
    process.chdir(projectName);

    // Initialize the npm package
    executeCommand('npm init -y');

    // Install Express.js Framework
    executeCommand('npm i --save express');

    // Install body-parser
    executeCommand('npm i --save body-parser');

    //Create a basic template for app.js file
    createFile(projectName, appTemplate);
}


main();