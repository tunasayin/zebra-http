import http from "http";

import { HTTPMethods } from "..";

export default class Request {
  rawRequest: http.IncomingMessage;

  // Shortcuts
  method: HTTPMethods;
  path: string | undefined;

  constructor(res: http.IncomingMessage) {
    this.rawRequest = res;

    // Shortcuts
    this.method = (this.rawRequest.method as HTTPMethods) || HTTPMethods.GET;
    this.path = this.rawRequest.url;
  }
}
