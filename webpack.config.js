const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'./src'),
    filename:'bundle.js',
    publicPath:'/abc',
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/,
      },
      {
        test:/\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','sass-loader']
        })
      }
    ]
  },
  // output:{
  //   path:path.resolve(__dirname,'./src'),
  //   filename:'styles.css',
  //   publicPath:'/',
  // },
  plugins:[
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("styles.css"),
  ],
  devServer:{
    contentBase:'./src',
    port:9000,
    historyApiFallback:true,
  },
};
