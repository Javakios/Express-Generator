const fs = require('fs');
const path = require('path');

const addStartScript = (package, dir) => {
    const packagePath = path.join(dir, package);
    if (fs.existsSync(packagePath)) {
        const packageJSON = require(packagePath);
        if (!packageJSON.scripts) {
            packageJSON.scripts = {};
        }
        packageJSON.scripts.start = "nodemon app.js";

        // Convert the packageJSON object to a string before writing
        const packageJSONString = JSON.stringify(packageJSON, null, 2);

        fs.writeFileSync(packagePath, packageJSONString);
        console.log('Added Start Script to package.json')
    }
}

module.exports = addStartScript;
