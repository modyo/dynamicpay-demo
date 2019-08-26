module.exports = {
  entry: ["./app/main.js"],
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    host: "sdk.com",
    port: 3000,
    https: false
  }
};
