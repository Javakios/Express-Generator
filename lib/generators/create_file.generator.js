const fs = require('fs');
const path = require('path');
const createFile = (fileName, fileContent, fileExtension, directory) => {
    let filepath;
    if (directory) {
        filepath = path.join(directory, fileName + fileExtension);
    } else {
        filepath = fileName + fileExtension;
    }

    fs.writeFileSync(filepath, fileContent);
}

module.exports = createFile;