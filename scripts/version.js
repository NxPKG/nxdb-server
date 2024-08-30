const fs = require('node:fs');

/**
 * Prints the version
 * and set it to the package.json version
 */
const packageJSON = require('../package.json');


packageJSON.version = packageJSON.devDependencies.nxdb;
fs.writeFileSync('./package.json', JSON.stringify(packageJSON, null, 2), 'utf-8');

console.log(packageJSON.devDependencies.nxdb);
