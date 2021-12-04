import fs, { stat } from "fs";
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
    const staticRoute = staticRoutes.filter((x) =>
      req.path?.startsWith(x.path)
    )[0];

    if (staticRoute && staticRoute.path) {
      const parsedURL = (req.path as string)
        .split(staticRoute?.path)
        .filter((x) => x != "");

      const requestedPath = path.normalize(
        path.join(staticRoute?.content, parsedURL.join("/"))
      );

      const isFile = (await fs.statSync(requestedPath)).isFile();

      if (isFile) {
        const fileData = await fs.readFileSync(requestedPath);

        res.rawResponse.end(fileData);
        return;
      }
    }

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

  async handleStaticRoteError(res: Response): Promise<void> {}
}
