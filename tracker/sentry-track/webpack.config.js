const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options:{
             "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose" : true }]
             ]
            }
        },
        include: path.join(__dirname,'src'),
        exclude:/node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes:true
      },
      hash: true,
      template: './src/index.html',
      filename:'index.html'
    })
  ],
  
  devServer: {
    contentBase:path.resolve(__dirname,'dist'),
    host:'localhost',
    compress:true,
    port:3002,
  }
}