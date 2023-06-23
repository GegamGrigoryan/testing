import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "D:/домашки/js in brow/testing/webpack.dev";

const server = new WebpackDevServer(webpack(config), {});
server.listen(8080, "localhost", (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send("ok");
  }
});
