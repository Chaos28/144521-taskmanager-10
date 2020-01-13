'use strict';

const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require(`path`);

const publicPath = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: publicPath
  },
  devtool: `source-map`,
  devServer: {
    contentBase: publicPath,
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`]
    })
  ]
};
