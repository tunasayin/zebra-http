import http from "http";
import https from "https";
import AppOptions from "./AppOptions";

export default class App {
  server: {
    http: http.Server;
    https: https.Server;
  };

  port: number;

  constructor({ debug, port }: AppOptions) {
    this.server = {
      http: http.createServer(),
      https: https.createServer(),
    };

    this.port = port;
  }

  start(p: number) {
    if (p) this.port = p;

    this.server.http.listen(this.port);
  }
}
