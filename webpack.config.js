const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: [path.resolve(__dirname, "app", "index.js")],
  mode: "production",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3333
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js"
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"]
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/static/index.html`
    })
  ],
  stats: "verbose"
};