import { RouteFunctionExecute, HTTPMethods } from "../constants";

class RouteFunction {
  methods: HTTPMethods[];
  execute: RouteFunctionExecute;

  constructor(methods: HTTPMethods[], execute: RouteFunctionExecute) {
    this.methods = methods;
    this.execute = execute;
  }
}

export default RouteFunction;
