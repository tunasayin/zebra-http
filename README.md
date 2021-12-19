<h1 align="center"> Zebra </h1>

<p align="center">Zebra is a basic HTTP server module written in TS that makes creating HTTP/HTTPS servers easier.</p>

<br/> <br/>

## Basic Zebra Server Code Snippet

```js
const Zebra = require("zebra-http");
const path = require("path");

const app = new Zebra.App({
  debug: true,
});

app.serve("/assets", path.join(__dirname, "/assets"));

app.get("/", (req, res) => {
  res.sendText("Hello World!").end();
});

// Or to combie multiple methods in one function you can also use this approach.
app.registerRoute("/", ["GET", "POST"], (req, res) => {
  res.sendText("Hello World!").end();
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});
```

## License

This project is licensed under GNU General Public License v3.0.
