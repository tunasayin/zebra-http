import http from "http";
import fs from "fs";

interface SetCookieOptions {
  maxAge?: number;
  expires: Date;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export default class Response {
  rawResponse: http.ServerResponse;

  constructor(res: http.ServerResponse) {
    this.rawResponse = res;
  }

  setStatus(status: number) {
    this.rawResponse.writeHead(status);
    return this;
  }

  sendText(data: string) {
    this.rawResponse.setHeader("Content-Type", "text/plain");
    this.rawResponse.write(data);
    return this;
  }

  sendHTML(htmlData: string) {
    this.rawResponse.setHeader("Content-Type", "text/html");
    this.rawResponse.write(htmlData);
    return this;
  }

  sendJSON(jsonData: object) {
    this.rawResponse.setHeader("Content-Type", "application/json");
    this.rawResponse.write(JSON.stringify(jsonData));
    return this;
  }

  sendFile(filePath: string) {
    this.rawResponse.write(fs.readFileSync(filePath));
    return this;
  }

  setCookie(
    cookieName: string,
    cookieValue: string,
    options?: SetCookieOptions
  ) {
    this.rawResponse.setHeader(
      "Set-Cookie",
      `${cookieName}=${cookieValue};${
        options?.expires ? "Expires=" + options.expires + ";" : ""
      }
       ${options?.maxAge ? "Max-Age=" + options.maxAge + ";" : ""}
       ${options?.domain ? "Domain=" + options.domain + ";" : ""}
       ${options?.path ? "Path=" + options.path + ";" : ""}
       ${options?.secure ? "Secure;" : ""}
       ${options?.httpOnly ? "HttpOnly;" : ""}`.trim()
    );
  }

  removeCookie(cookieName: string) {
    this.rawResponse.setHeader(
      "Set-Cookie",
      `${cookieName}=; Path=/; Expires=${new Date(1).toUTCString()}`
    );
  }

  end(data?: any): void {
    this.rawResponse.end(data);
  }
}
