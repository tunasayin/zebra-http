import Request from "./Request";
import Response from "./Response";
import RouteManager from "./RouteManager";
import { MiddlewareFunctionExecute } from "../constants";

class MiddlewareManager extends RouteManager {
  middlewares: MiddlewareFunctionExecute[];
  debug: boolean;

  constructor(debug: boolean) {
    super(debug);
    this.debug = debug;
    this.middlewares = [];
  }

  public createMiddleware(middlewareFunc: MiddlewareFunctionExecute): void {
    this.middlewares.push(middlewareFunc);
  }

  public executeMiddlewares(req: Request, res: Response): [Request, Response] {
    if (this.debug)
      console.log(
        "\x1b[32m[Zebra]\x1b[0m: Recieved a request, executing middlewares"
      );
    let request = req;
    let response = res;
    for (var i = 0; i < this.middlewares.length; i++) {
      [request, response] = this.middlewares[i](request, response);
    }

    return [request, response];
  }
}

export default MiddlewareManager;
