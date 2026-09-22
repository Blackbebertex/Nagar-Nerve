const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'src', 'data', 'demoState.json');
const destinationDirectory = path.join(__dirname, '..', 'dist', 'data');

fs.mkdirSync(destinationDirectory, { recursive: true });
fs.copyFileSync(source, path.join(destinationDirectory, 'demoState.json'));
