const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const host = "localhost";
const port = 3000;
const customPath = path.join(__dirname, "./customPublicPath");
const hotScript =
  "webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true";

const baseDevConfig = () => ({
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  entry: {
    newTab: [
      customPath,
      hotScript,
      path.join(__dirname, "../chrome/extension/newTab")
    ],
    background: [
      customPath,
      hotScript,
      path.join(__dirname, "../chrome/extension/background")
    ]
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true
    },
    noInfo: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  hotMiddleware: {
    path: "/js/__webpack_hmr"
  },
  output: {
    path: path.join(__dirname, "../dev/js"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      "process.env": {
        NODE_ENV: JSON.stringify("development")
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
        // options: {
        //   presets: ["react-hmre"]
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
});

// const injectPageConfig = baseDevConfig();
// injectPageConfig.entry = [
//   customPath,
//   path.join(__dirname, "../chrome/extension/inject")
// ];
// delete injectPageConfig.hotMiddleware;
// delete injectPageConfig.module.rules[0].options;
// injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
// injectPageConfig.output = {
//   path: path.join(__dirname, "../dev/js"),
//   filename: "inject.bundle.js"
// };
const appConfig = baseDevConfig();

module.exports = [appConfig];
