const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
    webpack: (config, { dev }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: 'babel-loader!raw-loader'
            },
            {
                test: /\.scss$/,
                loader: 'babel-loader!raw-loader!sass-loader'
            }
        );
        return config;
    }
};
