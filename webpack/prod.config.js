const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const customPath = path.join(__dirname, "./customPublicPath");

module.exports = {
  entry: {
    newTab: [customPath, path.join(__dirname, "../chrome/extension/newTab")],
    background: [
      customPath,
      path.join(__dirname, "../chrome/extension/background")
    ]
  },
  output: {
    path: path.join(__dirname, "../build/js"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        ie8: false,
        output: {
          comments: false
        }
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compressor: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
        // query: {
        //   // presets: ["react-optimize"]
        // }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "primary-color": "#738598",
                "link-color": "#738598"
              }
            }
          }
        ]
      }
    ]
  }
};
