import fs from "fs";
import path from "path";

import Route from "./Route";
import Response from "./Response";
import Request from "./Request";

import { HTTPMethods } from "..";
import StaticRoute from "./StaticRoute";

export default class RouteManager {
  debug: boolean;
  routes: Route[];

  constructor(debug: boolean) {
    this.debug = debug;
    this.routes = [];
  }

  public registerRoute(
    path: string,
    methods: HTTPMethods[] | HTTPMethods,
    routeFunction: (req: any, res: any) => void
  ): Route {
    if (!path.startsWith("/"))
      throw new Error(
        "Invalid path name was specified while registering route!"
      );

    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    if (!routeFunction)
      throw new Error("Cannot create a route without a route function!");

    for (var i = 0; i < methods.length; i++) {
      if (!HTTPMethods[methods[i]])
        throw new Error(
          "Invalid method was specified while registering route!"
        );
    }

    const route = new Route(path, methods, routeFunction);

    this.routes.push(route);

    return route;
  }

  async _handleRoute(req: Request, res: Response, staticRoutes: StaticRoute[]) {
    const route = this.routes.find((x) => x.path === req.path);

    if (route?.methods.includes(req.method)) {
      try {
        if (this.debug)
          console.log(
            `\x1b[32m[hTunaTP]\x1b[0m: Recieved, a request executing route ${route.path}.`
          );

        route?.exec(req, res);
      } catch (err: any) {
        this._handleRouteError(res, err);
      }
    }

    // TODO: https://stackabuse.com/node-http-servers-for-static-file-serving/
    // serve-static
    if (req.method === "GET") {
      console.log(req.path);
      const staticRoute = staticRoutes.find((x) => x.path === req.path);

      if (staticRoute) {
        for (var i = 0; i < staticRoute.content.length; i++) {
          try {
            const isFile = (
              await fs.statSync(staticRoute.content[i])
            )?.isFile();
            if (isFile) {
              if (route) return res.end();
              else {
                res.rawResponse.write(
                  await fs.readFileSync(staticRoute.content[i])
                );
              }
            } else {
            }
          } catch (err: any) {
            throw err;
          }
        }
      }
    }
  }

  async _handleRouteError(res: Response, err: Error): Promise<void> {
    if (!this.debug) return;

    const html = await fs.readFileSync(
      path.join(__dirname, "..", "..", "templates", "error.html"),
      "utf-8"
    );

    const parsedHTML = html
      .replace("$error_name", err.name)
      .replace("$error_message", err.message)
      .replace(
        "$error_stack",
        err.stack
          ? err.stack
              .toString()
              .replace(err.name, "")
              .replace(err.message, "")
              .replace(": ", "")
          : "None"
      );

    res.sendHTML(parsedHTML).end();
  }
}
