const fs = require('fs');
const path = require('path');

const databaseConfig = (fileContent) => {
    const filepath = "config/database.config.js";
    
    fs.writeFileSync(filepath, fileContent);
}

module.exports = databaseConfig;