<h1 align="center"> Beaver </h1>

<p align="center">Beaver is a basic HTTP server module written in TS that makes creating HTTP/HTTPS servers easier.</p>

<br/> <br/>

## Basic Beaver Server Code Snippet

```js
const Beaver = require("beaver");
const path = require("path");

const app = new Beaver.App({
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

## TODO

- Middleware system specific for routes (router).
- Better request class
- Multi threading (creating a thread for every request - to prevent from slowloris there is going to be a timeout)

## License

This project is licensed under GNU General Public License v3.0.
