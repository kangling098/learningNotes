
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FastTrackPlugin = require('fast-track-plugin')


module.exports = {
  // devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            'plugins': [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
          }
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    
    // new FileList({}),
    
    new FastTrackPlugin({
      app_key: '6a786cf41e3a84ac',
      prefix_path: 'prefix',
      product_code: 'fast',
      app_code: 'analysis',
      is_delete_source_map: true,
    }),
    new UglifyJsPlugin({
      cache: true,//启动缓存
      parallel: true,//启动并行压缩
      extractComments: true,
      //如果为true的话，可以获得sourcemap
      sourceMap: true // set to true if you want JS source maps
    }),
    
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes:true
    },
    hash: true,
    template: './src/index.html',
    filename:'index.html'
}),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 3010,
  },
}