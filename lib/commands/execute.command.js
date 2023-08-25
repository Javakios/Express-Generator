const { execSync } = require('child_process');


// Function to execute shell commands
const executeCommand = (command) => {
    execSync(command, { stdio: 'inherit' });
};

module.exports = { executeCommand: executeCommand }