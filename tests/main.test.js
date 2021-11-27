/*
    ! In debug mode you cannot use SSL.
    ! If you want to use ssl then you should provide ssl files
*/
const HTunaTP = require("../dist/index");

const app = new HTunaTP.App({
  debug: true,
});

app.start(3000, () => {
  console.log("Server started at port 3000");
});
