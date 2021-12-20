<h1 align="center"> Zebra </h1>

<p align="center">Zebra is a basic HTTP server module written in TS that makes creating HTTP/HTTPS servers easier.</p>
<p align="center">
  <img src="https://img.shields.io/npm/v/zebra-http.svg" />
  <img src="https://img.shields.io/npm/dm/zebra-http.svg" />
</p>

<br/>

## Features

- Fast
- Lightweight
- Object-oriented

<br/>

## Example Zebra Server

```js
const Zebra = require("zebra-http");
const path = require("path");

const app = new Zebra.App({
  debug: true,
});

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

## Documentation

Click [here](https://tunasayin.github.io/zebra-http/) to go to the documentation.

## License

This project is licensed under GNU General Public License v3.0.
