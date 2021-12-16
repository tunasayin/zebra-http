const HTunaTP = require("../dist/index");
const path = require("path");

const app = new HTunaTP.App({
  debug: true,
});

app.serve("/", path.join(__dirname, "public"));

app.registerRoute("/", ["GET"], (req, res) => {
  console.log("SJ");
});

app.registerRoute("/", ["GET", "POST"], (req, res) => {
  console.log("SJ2");
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});
