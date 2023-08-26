// APP TEMPLATE 
const appTemplate = require('./lib/templates/app.template');

// TERMINAL UI 
const readLine = require('readline');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m'
};


// CREATE THE INTERFACE 
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

// COMMAND
const executeCommand = require('./lib/commands/execute.command').executeCommand;

// GENERATORS
const createDirectory = require('./lib/generators/create_directory.generator');
const createFile = require('./lib/generators/create_file.generator');
const addStartScript = require('./lib/generators/add_start_script.generator');

// MAIN FUNCTION 
const main = async () => {

    // Show initial loading message
    console.log('Creating Express.js project: Loading...');

    rl.question('Enter project name: ', (projectName) => {
        rl.close();
        if (!projectName.trim()) {
            console.log('Project name cannot be empty.');
            return;
        }

        // Show loading message while creating the project directory
        console.log('Creating project directory: Loading...');
        createDirectory(projectName);

        // Navigate to the project directory
        process.chdir(projectName);

        // Show loading message while initializing npm
        console.log('Initializing npm: Loading...');
        executeCommand('npm init -y');

        // Show loading message while installing Express.js
        console.log('Installing Express.js: Loading...');
        executeCommand('npm i --save express');

        // Show loading message while installing body-parser
        console.log('Installing body-parser: Loading...');
        executeCommand('npm i --save body-parser');

        // Show loading message while installing Nodemon
        console.log('Installing Nodemon: Loading...');
        executeCommand('npm i --save-dev nodemon');

        // Show loading message while installing Morgan
        console.log('Installing Morgan: Loading ...');
        executeCommand('npm i --save-dev morgan');

        // Add the start script
        console.log('Adding start script: Loading...');
        addStartScript('./package.json', process.cwd());


        // Show loading message while creating the app.js file
        console.log('Creating app.js: Loading...');
        createFile('app', appTemplate, '.js');

        // Show completion message
        console.log(`${colors.green}Express.js project generated successfully✔${colors.reset}`);
    });
};

main();

