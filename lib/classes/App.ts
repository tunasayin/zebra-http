// Native Modules
import http from "http";
import https from "https";
import Response from "./Response";
import Request from "./Request";
import Static from "./StaticRoute";
import StaticRoute from "./StaticRoute";
import MiddlewareManager from "./MiddlewareManager";
import { AppOptions, RouteFunctionExecute, HTTPMethods } from "../constants";

export default class App extends MiddlewareManager {
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
    privkey: string;
    cert: string;
    ca: string;
  } | null;

  readonly staticRoutes: Static[];

  constructor({ debug, useSSL, keys }: AppOptions) {
    super(debug);

    this.servers = {
      http: http.createServer((req, res) => {
        this._handleRequest(req, res, true);
      }),
      https: null,
    };

    this.debug = debug;
    this.ports = {
      http: null,
      https: 443,
    };

    this.staticRoutes = [];

    if (useSSL) {
      if (!keys) throw new Error("Cannot create ssl server without ssl keys.");
      if (this.debug)
        process.emitWarning(
          "Using ssl server with debug mode is not recommended please consider not using ssl while debugging your server."
        );

      this.keys = keys;

      this.servers.https = https.createServer(this.keys, (req, res) => {
        this._handleRequest(req, res, false);
      });
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
        `\x1b[32m[zebra-http]\x1b[0m: An unexpected error occued while starting HTTP server. \n${err}`
      );
    }

    if (this.keys) {
      try {
        this.servers.https?.listen(this.ports.https);

        canRun += 1;
      } catch (err) {
        throw new Error(
          `\x1b[32m[zebra-http]\x1b[0m: An unexpected error occured while starting HTTPS server. \n${err}`
        );
      }
    } else {
      canRun += 1;
    }

    if (started) {
      while (canRun == 2) {
        started();
        if (this.ports.http !== 80 && this.keys) {
          process.emitWarning(
            "Using a port diffrent than 80 while using ssl is not recommended please consider chaning the port to 80."
          );
        }
        canRun = 3;
      }
    }
  }

  private async _handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    isHTTP: boolean
  ): Promise<void> {
    // If ssl is enabled redirect http to https
    if (this.keys && isHTTP) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });

      res.end();

      return;
    }

    // Pase body if exists and attach it
    if (req.readable) {
      await new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
          // Parse data if exists
          if (data.length != 0) {
            // Parse json if data is json
            try {
              let json = JSON.parse(data);
              data = json;
            } catch (err) {}

            Object.assign(req, { body: data });
          }

          resolve(null);
        });
      });
    }

    let request = new Request(req);
    let response = new Response(res);

    [request, response] = this.executeMiddlewares(request, response);

    this._handleRoute(request, response, this.staticRoutes);
  }

  serve(urlPath: string, folderPath: string): StaticRoute {
    if (!urlPath.startsWith("/"))
      throw new Error("Invalid url path was specified for static route");

    const urlExists = this.staticRoutes.find((x) => x.path === urlPath)
      ? true
      : false;

    if (urlExists)
      throw new Error("Already crated a static route at" + urlPath + "");

    const route = new StaticRoute(urlPath, folderPath);

    this.staticRoutes.push(route);

    return route;
  }

  // Shortands
  get(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.GET], routeFunction);
  }

  head(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.HEAD], routeFunction);
  }

  post(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.POST], routeFunction);
  }

  put(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.PUT], routeFunction);
  }

  delete(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.DELETE], routeFunction);
  }

  patch(route: string, routeFunction: RouteFunctionExecute) {
    this.registerRoute(route, [HTTPMethods.PATCH], routeFunction);
  }

  all(route: string, routeFunction: RouteFunctionExecute) {
    const methodsArray = [
      ...Object.getOwnPropertyNames(HTTPMethods),
    ] as HTTPMethods[];

    this.registerRoute(route, methodsArray, routeFunction);
  }
}
