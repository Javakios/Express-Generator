// FILE TEMPLATES 
const appTemplate = require('./lib/templates/app.template');
const userRoutesTemplate = require('./lib/templates/usersRoute.template');
const create_middleware = require('./lib/templates/create_middleware.template');
const update_middleware = require('./lib/templates/update_middleware');
const database_config = require('./lib/templates/database_config.template');
const userModelTemplate = require('./lib/templates/user_model.template');
// TERMINAL UI 
const readLine = require('readline');

// DATABASE DRIVERS 
const drivers = require('./lib/drivers/available.drivers');

//COLORS
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
const create_database_config = require('./lib/generators/create_database_config.generator');

// MAIN FUNCTION 
const main = async () => {

    // Show initial loading message
    console.log('Creating Express.js project: Loading...');

    rl.question('Enter project name: ', (projectName) => {

        if (!projectName.trim()) {
            console.log('Project name cannot be empty.');
            return;
        }

        // Show loading message while creating the project directory
        console.log('Creating project directory: Loading...');
        createDirectory(projectName);
        // Ask for port 
        rl.question('Enter the port number (default:3000): ', (port) => {
            console.log('Choose a database driver:');
            drivers.forEach((driver, index) => {
                console.log(`${index + 1}) ${driver}`);
            });
            rl.question('Enter your database driver: ', (choice) => {





                // Navigate to the project directory
                try {
                    process.chdir(projectName);
                } catch (error) {
                    console.error('Error navigating to project directory:', error.message);
                    return;
                }
                // Show loading message while initializing npm
                console.log('Initializing npm: Loading...');
                executeCommand('npm init -y');

                // Show loading message while installing Express.js
                console.log('Installing Express.js: Loading...');
                executeCommand('npm i --save express');

                // Show loading message while installing body-parser
                console.log('Installing body-parser: Loading...');
                executeCommand('npm i --save body-parser');

                // Show loading message while installing knex
                console.log('Installing knex: Loading...');
                executeCommand('npm i --save knex');

                // Show loading message while installing the database driver 
                console.log(`Installing ${drivers[choice - 1]}: Loading...`);
                executeCommand(`npm i --save ${drivers[choice - 1]}`);


                //Show loading message while installing express-validator
                console.log('Installing express-validator : Loading...')
                executeCommand('npm i --save express-validator');

                // Show loading message while installing Nodemon
                console.log('Installing Nodemon: Loading...');
                executeCommand('npm i --save-dev nodemon');

                // Show loading message while installing Morgan
                console.log('Installing Morgan: Loading...');
                executeCommand('npm i --save-dev morgan');

                // Add the start script
                console.log('Adding start script: Loading...');
                addStartScript('./package.json', process.cwd());

                // Show loading message while creating config directory

                console.log('Creating config: Loading...');
                createDirectory('config');
                rl.question('Enter Your Database Name (default ->' + projectName + ') ', (databaseName) => {
                    rl.question('Enter Your Database User: ', (user) => {
                        rl.question("Enter User's passowrd", (password) => {

                            // Show loading message while creating the app.js file
                            console.log('Creating app.js: Loading...');
                            createFile('app', appTemplate(port, databaseName), '.js');


                            // Show loading message while creating database config file 
                            console.log('Creating database config file: Loading...');
                            create_database_config(database_config(drivers[choice - 1], user, password));

                            // Show loading message while creating the models directory
                            console.log('Creating models : Loading...');
                            createDirectory('models');

                            // Show loading message while creating the user model file
                            console.log('Creatgin user model : Loading...');
                            createFile('user', userModelTemplate, '.js', 'models');

                            // Show loading message while crating the routes directory
                            console.log('Creating routes : Loading...');
                            createDirectory('routes');

                            //Show Loading message while creating the users routes file
                            console.log('Creating users.js router: Loading...');
                            createFile('users', userRoutesTemplate, '.js', 'routes');


                            //Show loading message while creating the controllers direcotory
                            console.log('Creating controllers : Loading...');
                            createDirectory('controllers');

                            console.log('Creating middleware : Loading...');
                            createDirectory('middleware');

                            console.log('Creating users middleware directory : Loading...');

                            createDirectory('middleware/users');

                            // Show loading message while creating the user's midlewares
                            console.log('Creating users middleware files : Loading...')
                            createFile('create', create_middleware, '.js', 'middleware/users')
                            createFile('update', update_middleware, '.js', 'middleware/users')

                            console.log(`${colors.green}User's Middlewares created succesfully${colors.reset}`);


                            rl.close();
                            // Show completion message
                            console.log(`${colors.green}Express.js project generated successfully✔${colors.reset}`);
                        });
                    })
                })
            })
        })
    })
};

main();

