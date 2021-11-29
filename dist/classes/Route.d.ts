declare enum HTTPMethods {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
    PATCH = "PATCH"
}
export default class Route {
    path: string;
    methods: HTTPMethods[];
    exec: (req: any, res: any) => void;
    constructor(path: string, methods: HTTPMethods[], routeFunction: (req: any, res: any) => void);
}
export { Route, HTTPMethods };
