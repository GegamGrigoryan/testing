const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// const config = require("../webpack.dev");
const config = require("D:/homework/js_in_brow/testing/webpack.dev");

const server = new WebpackDevServer(webpack(config), {});
server.listen(9000, "localhost", (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send("ok");
  }
});
