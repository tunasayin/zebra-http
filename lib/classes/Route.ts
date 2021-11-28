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
  path: string;
  methods: HTTPMethods[];
  exec: (req: any, res: any) => void;
  static_files: string[];

  constructor(
    path: string,
    methods: HTTPMethods[],
    routeFunction: (req: any, res: any) => void,
    static_files?: string[]
  ) {
    this.path = path;
    this.methods = [...methods];
    this.exec = routeFunction;
    if (static_files) this.static_files = [...static_files];
    else this.static_files = [];
  }
}

export { Route, HTTPMethods };
