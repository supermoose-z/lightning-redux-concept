const path = require('path');
const Dotenv = require('dotenv-webpack');

const baseConfig = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new Dotenv({ path: '.env' }),
    ]
};

const configOptions = {
    defaultConfig: {
        ...baseConfig,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 3000,
        },
    },

    tizenConfig: {
        ...baseConfig,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'tizen', 'reduxTizen'),
        },
    },
};

const useConfig = process.env.CONFIG_OPTION || 'defaultConfig';


// test
module.exports = configOptions[useConfig];