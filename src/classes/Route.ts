enum HTTPMethods {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH",
}

export default class Route {
  methods: HTTPMethods[];
  exec: (req: any, res: any) => void;

  constructor(
    methods: HTTPMethods[],
    routeFunction: (req: any, res: any) => void
  ) {
    this.methods = [];
    this.exec = routeFunction;
  }
}

export { Route, HTTPMethods };
