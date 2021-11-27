const path = require("path");

const HTunaTP = require("../dist/index");

const app = new HTunaTP.App({
  debug: true,
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});

app.registerRoute("/", ["GET"], (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));

  res.end();
});

app.registerRoute("/otuzbir", ["GET"], (req, res) => {
  res.send("otuzbir desem sj der misin?");

  res.end();
});
