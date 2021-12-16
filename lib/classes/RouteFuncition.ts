import { HTTPMethods } from "..";

type RouteFunctionExecute = (req: any, res: any) => void;

class RouteFunction {
  methods: HTTPMethods[];
  execute: RouteFunctionExecute;

  constructor(methods: HTTPMethods[], execute: RouteFunctionExecute) {
    this.methods = methods;
    this.execute = execute;
  }
}

export default RouteFunction;
export { RouteFunction, RouteFunctionExecute };
