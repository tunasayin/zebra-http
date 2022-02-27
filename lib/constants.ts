import Request from "./classes/Request";
import Response from "./classes/Response";

interface AppOptions {
  debug: boolean;
  useSSL: boolean | undefined;
  keys:
    | {
        privkey: string;
        cert: string;
        ca: string;
      }
    | undefined;
}

interface SetCookieOptions {
  maxAge?: number;
  expires: Date;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

interface RouterArgs {
  path: string;
}

type MiddlewareFunctionExecute = {
  (req: Request, res: Response): [Request, Response];
};

type RouteFunctionExecute = (req: any, res: any) => void;

enum HTTPMethods {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

enum ContentTypes {
  "css" = "text/css",
  "csv" = "text/csv",
  "html" = "text/html",
  "txt" = "text/plain",
  "js" = "application/javascript",
  "ogg" = "application/ogg",
  "pdf" = "application/pdf",
  "json" = "application/json",
  "xml" = "application/xml",
  "zip" = "application/zip",
  "x-www-form-urlencoded" = "application/x-www-form-urlencoded",
}

export {
  AppOptions,
  SetCookieOptions,
  MiddlewareFunctionExecute,
  RouteFunctionExecute,
  HTTPMethods,
  ContentTypes,
  RouterArgs,
};
