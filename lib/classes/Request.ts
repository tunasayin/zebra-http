import http from "http";

import { HTTPMethods } from "..";

export default class Request {
  rawRequest: http.IncomingMessage;

  // Shortcuts
  method: HTTPMethods;
  path: string | undefined;

  cookies: object;

  constructor(res: http.IncomingMessage) {
    this.rawRequest = res;

    // Shortcuts
    this.method = (this.rawRequest.method as HTTPMethods) || HTTPMethods.GET;
    this.path = this.rawRequest.url;

    this.cookies = {};

    this.rawRequest.headers.cookie
      ?.toString()
      .split(";")
      .forEach((cookie) => {
        const parsedCookie = cookie.split("=");

        Object.assign(this.cookies, { [parsedCookie[0]]: parsedCookie[1] });
      });
  }

  getCookie(cookieName: string): string | null {
    return (this.cookies as any)[cookieName] || null;
  }
}
