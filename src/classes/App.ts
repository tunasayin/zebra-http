// Native Modules
import http from "http";
import https from "https";
import path from "path";

import AppOptions from "./AppOptions";
import Response from "./Response";
import Request from "./Request";
import RouteManager from "./RouteManager";

export default class App extends RouteManager {
  protected servers: {
    http: http.Server;
    https: https.Server | null;
  };

  readonly ports: {
    http: number | null;
    https: number | null;
  };

  readonly debug: boolean;

  readonly keys: {
    key: string;
    cert: string;
    ca: string;
  } | null;

  constructor({ debug, useSSL, keys }: AppOptions) {
    super();

    this.servers = {
      http: http.createServer((req, res) => {
        this._handleRequest(req, res);
      }),
      https: null,
    };

    this.debug = debug;
    this.ports = {
      http: null,
      https: 443,
    };

    if (useSSL) {
      if (!keys) throw new Error("Cannot create ssl server without ssl keys.");
      if (this.debug)
        process.emitWarning(
          "Using ssl server with debug mode is not recommended please consider not using ssl while creating your server."
        );

      this.keys = keys;

      this.servers.https = https.createServer(this.keys, this._handleRequest);
    } else {
      this.keys = null;
    }
  }

  public start(httpPort: number, started?: () => void): void {
    let canRun: number = 0;
    if (!httpPort) throw new Error("Cannot start server witout a port");

    this.ports.http = httpPort;

    try {
      this.servers.http.listen(httpPort);

      canRun += 1;
    } catch (err) {
      throw new Error(
        `[hTunaTP]: An unexpected error occued while starting HTTP server. \n${err}`
      );
    }

    if (this.keys) {
      try {
        this.servers.https?.listen(this.ports.https);

        canRun += 1;
      } catch (err) {
        throw new Error(
          `[hTunaTP]: An unexpected error occured while starting HTTPS server. \n${err}`
        );
      }
    } else {
      canRun += 1;
    }

    if (started) {
      while (canRun == 2) {
        started();
        canRun = 3;
      }
    }
  }

  private _handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): void {
    const HTunaTPResponse = new Response(res);

    HTunaTPResponse.setStatus(400);

    HTunaTPResponse.sendFile(
      path.join(__dirname, "..", "..", "tests", "index.html")
    );

    HTunaTPResponse.end();
  }
}
