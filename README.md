<h1 align="center"> HTunaTP </h1>

HTunaTp is a http server module that automates lots of stuff such as serving ssl files, or creating routes easily.

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
