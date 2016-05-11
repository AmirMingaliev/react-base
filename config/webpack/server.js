import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../gulp';
import postcssConfig from '../postcss/config';

export default {
  resolve: {
    root: [
      path.resolve(config.appDir)
    ],
    alias: {
      config: path.resolve(config.configDir, 'app', config.env)
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  entry: [
    `webpack-dev-server/client?${config.target}/`,
    `webpack/hot/only-dev-server`,
    path.resolve(config.appDir, 'application.jsx')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'application.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(config.appDir, 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js[x]$/,
        exclude: [/node_modules/],
        loader: 'react-hot!babel'
      },
      {
        test: /\.css$/,
        include: [/app\/stylesheets\//],
        loader: 'style!css!postcss'
      },
      {
        test: /\.css$/,
        exclude: [/app\/stylesheets\//],
        loader: 'style!css?modules&importLoaders=1!postcss'
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff2|woff)$/,
        loader: 'url'
      }
    ]
  },
  postcss: postcssConfig
};
