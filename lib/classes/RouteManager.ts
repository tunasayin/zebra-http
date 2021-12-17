import fs from "fs";
import path from "path";
import Route from "./Route";
import Response from "./Response";
import Request from "./Request";
import StaticRoute from "./StaticRoute";
import { RouteFunctionExecute, HTTPMethods, ContentTypes } from "../constants";
import RouteFunction from "./RouteFuncition";

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
    routeFunction: RouteFunctionExecute
  ): void {
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

    const routeAlreadyExists =
      this.routes.filter((x) => x.path == path).length == 0 ? false : true;

    if (routeAlreadyExists) {
      const route = this.routes.find((x) => x.path == path);
      const routeFunc = new RouteFunction(methods, routeFunction);
      route?.routeFunctions.push(routeFunc);
    } else {
      const route = new Route(path, methods, routeFunction);

      this.routes.push(route);
    }
  }

  async _handleRoute(req: Request, res: Response, staticRoutes: StaticRoute[]) {
    const route = this.routes.find((x) => x.path === req.path);
    const staticRoute = staticRoutes.filter((x) =>
      req.path?.startsWith(x.path)
    )[0];

    if (staticRoute && staticRoute.path) {
      const parsedURL = (req.path as string)
        .split(staticRoute?.path)
        .filter((x) => x != "");

      // Clear .. in route to prevent from clients accessing outside of the static folder
      for (var i = 0; i < parsedURL.length; i++) {
        if (parsedURL[i] == "..") parsedURL[i] = "";
      }

      const requestedPath = path.normalize(
        path.join(
          staticRoute?.content,
          parsedURL.filter((x) => x != "").join("/")
        )
      );

      try {
        const isFile = (await fs.statSync(requestedPath)).isFile();

        if (isFile) {
          const fileData = await fs.readFileSync(requestedPath);
          const contentTypes = ContentTypes as any;
          let fileExt = requestedPath.split(".").pop() as string;

          res.rawResponse.writeHead(
            200,
            contentTypes[fileExt]
              ? {
                  "Content-Type": contentTypes[fileExt],
                }
              : {}
          );

          res.rawResponse.end(fileData);
          return;
        }
      } catch (err) {}
    }

    if (route?.getAvailableMethods().includes(req.method)) {
      try {
        if (this.debug)
          console.log(
            `\x1b[32m[hTunaTP]\x1b[0m: Recieved, a request executing route ${route.path}.`
          );

        route.executeRelatedRoutes(req.method, req, res);
      } catch (err: any) {
        this._handleRouteError(req, res, err);
      }
    }
  }

  async _handleRouteError(
    req: Request,
    res: Response,
    err: Error
  ): Promise<void> {
    if (!this.debug) return;

    console.log(
      `\x1b[32m[hTunaTP]\x1b[0m: \x1b[31mEncountered an error on ${req.method} ${req.path}, open route on browser to see information about the error.\x1b[0m`
    );

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

  // TODO
  async handleStaticRoteError(res: Response): Promise<void> {}
}
