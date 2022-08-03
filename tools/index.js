const fs = require('fs-extra')
const path = require(`path`)

const projectPath = path.resolve(__dirname, '../');
const reactStaticFilePath = path.resolve(projectPath, 'public', 'react', 'static');
const reactBuildPath = path.resolve(projectPath, 'react', 'build', 'node_modules');
fs.emptyDirSync(reactStaticFilePath);
fs.copySync(reactBuildPath, reactStaticFilePath);