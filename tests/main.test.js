const path = require("path");

const HTunaTP = require("../dist/index");

const app = new HTunaTP.App({
  debug: true,
});

app.serve("/", path.join(__dirname, "public"));

app.start(3000, () => {
  console.log("Server started at port 3000");
});

app.registerRoute("/", ["GET"], (req, res) => {
  console.log(req.cookies);
  res.sendFile(path.join(__dirname, "html", "index.html")).end();
});

app.registerRoute("/text", ["GET"], (req, res) => {
  res.sendText("Hello World!").end();
});

app.registerRoute("/html", ["GET"], (req, res) => {
  console.asda.adasd.adsa;
});

app.registerRoute("/json", ["GET"], (req, res) => {
  res
    .sendJSON({
      status: 200,
      message: "Successfull!",
    })
    .end();
});

app.registerRoute("/set-cookie", ["GET"], (req, res) => {
  res.setCookie("SJ", "BRUH");

  res.sendText("adsada");

  res.end();
});

app.registerRoute("/delete-cookie", ["GET"], (req, res) => {
  res.removeCookie("SJ");

  res.sendText("adsada");

  res.end();
});
