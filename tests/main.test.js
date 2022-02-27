const Zibra = require("../dist/index");
const path = require("path");

const app = new Zibra.App({
  debug: true,
});

app.serve("/", path.join(__dirname, "public"));

app.createMiddleware((req, res) => {
  console.log("Recieved a request!");
  return [req, res];
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html")).end();
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});
