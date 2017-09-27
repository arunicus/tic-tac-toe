const path = require('path');

module.exports = {
    entry: './src/tic-tac-polymer-app/tic-tac-polymer-app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};