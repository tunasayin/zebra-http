<h1 align="center"> HTunaTP </h1>

<p align="center">HTunaTp is a basic HTTP server module written in TS that makes creating HTTP servers easier.</p>

### Basic HTunaTP Server Code Snippet

```js
const HTunaTP = require("htunatp");

const app = new HTunaTP.App({
  debug: true,
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});

app.registerRoute("/", ["GET"], (req, res) => {
  res.send("Hello World!");

  res.end();
});
```
