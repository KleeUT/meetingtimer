var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './web/src/Main.jsx',
  devtool: "source-map",
  output: { path: __dirname, filename: './server/public/dist/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  // plugins:[
  //   new webpack.optimize.UglifyJsPlugin({minimize:false})
  // ],
  externals:{
    "$":"$",
    "jQuery":"jQuery"
    // "react":"React",
    // "ReactDOM":"ReactDOM",
  }
};
