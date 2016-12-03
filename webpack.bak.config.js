var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
//  var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
// var p2 = path.join(phaserModule, 'build/custom/p2.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: {
    app:    path.resolve(__dirname, 'src/main.ts'),
    vendor: ['pixi'
      // , 'p2'
      , 'phaser', 'webfontloader']
  },

  devtool: 'cheap-source-map',
  
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist/app'),
    filename: 'bundle.js'
  },
  
  watch: true,
  
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    // new BrowserSyncPlugin({
    //   host: process.env.IP || 'localhost',
    //   port: process.env.PORT || 3000,
    //   server: {
    //     baseDir: ['dist'],
    //     compress: true
    //   }
    // }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/index.html', to: ''}
    ])
    ,new webpack.optimize.UglifyJsPlugin({
      // comments : false,
      compress : {
        warnings:false
      }
    })
  ],
  
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader:           "ts-loader" },
      { test: /pixi\.js/, loader:          'expose?PIXI' },
      // { test: /p2\.js/, loader:          'expose?p2' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' }
    ]
  },
  node: {
    fs:  'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias:      {
      'phaser': phaser,
      // 'p2':   p2,
      'pixi':   pixi
    }
  },
  devServer: {
    contentBase: "dist",
    inline: true
    // ,compress: true
  }
}
