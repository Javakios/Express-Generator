
const createFile = (fileName, fileContent) => {
    fs.writeFileSync(fileName, fileContent);
}

module.exports = createFile;