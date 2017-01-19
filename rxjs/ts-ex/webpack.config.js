module.exports = {
    entry: './main',
    output: {
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' }
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    }
}
