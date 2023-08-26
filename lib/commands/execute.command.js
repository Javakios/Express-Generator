const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');


// Function to execute shell commands
const executeCommand = (command) => {
    const logFilePath = path.join(process.cwd(), 'npm-log.txt');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    // Open the log file descriptor
    const logFd = fs.openSync(logFilePath, 'a');

    // Use child_process.spawnSync to capture and redirect the output
    const options = {
        stdio: ['ignore', logFd, logFd], // Redirect stdout and stderr to the same log file descriptor
        shell: true, // Use shell to execute the command
        windowsHide: true, // Hide the spawned process window on Windows
    };

    childProcess.spawnSync(command, options);

    // Close the log file descriptor
    fs.closeSync(logFd);
    const colors = {
        reset: '\x1b[0m',
        green: '\x1b[32m'
    };

    // Apply colors to log messages
    console.log(`${colors.green}Installation completed successfully ✔${colors.reset}`);
};

module.exports = { executeCommand };
