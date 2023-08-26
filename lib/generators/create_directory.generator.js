const fs = require('fs');
const path = require('path');

const createDirectory = (dirPath, isSubdirectory = false) => {
    if (isSubdirectory) {
        dirPath = path.join(process.cwd(), dirPath);
    }


    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

module.exports = createDirectory;