const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const path = require('path');

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
 
});