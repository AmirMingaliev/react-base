import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../gulp';
import postcssConfig from '../postcss/config';

export default {
  resolve: {
    root: [
      path.resolve(`./${config.appDir}`)
    ],
    alias: {
      config: path.resolve(`./${config.configDir}/app/${config.env}`)
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  entry: `./${config.appDir}/application.jsx`,
  output: {
    path: path.resolve(config.distDir),
    filename: 'application.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(`./${config.appDir}/index.html`)
    }),
    new ExtractTextPlugin('application.css'),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js[x]$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style!css?importLoaders=1!postcss')
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff2|woff)$/,
        loader: 'file'
      }
    ]
  },
  postcss: postcssConfig
};
