/*
    ! In debug mode you cannot use SSL.
    ! If you want to use ssl then you should provide ssl files
*/

import HTunaTP from "../dist";

const app = new HTunaTP.App({
  debug: true,
});

app.crateRoute("get", (req, res) => {});

app.start(3000, (metadData) => {
  console.log("Server started at port 3000");
});
