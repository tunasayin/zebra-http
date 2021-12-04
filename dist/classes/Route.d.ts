import { HTTPMethods } from "../constants";
export default class Route {
    path: string;
    methods: HTTPMethods[];
    exec: (req: any, res: any) => void;
    constructor(path: string, methods: HTTPMethods[], routeFunction: (req: any, res: any) => void);
}
