const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("D:/домашки/js in brow/testing/webpack.dev.js");

const server = new WebpackDevServer(webpack(config), {});
server.listen(9000, "localhost", (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send("ok");
  }
});
