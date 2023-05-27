const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
    mode: 'production',
    watch: true,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.mp3$/,
                include: SRC,
                loader: 'file-loader'
            },
         ]
    }

}