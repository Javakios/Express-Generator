const fs = require('fs')
const createFile = (fileName, fileContent, fileExtention) => {
    fs.writeFileSync(fileName + fileExtention, fileContent);
}

module.exports = createFile;