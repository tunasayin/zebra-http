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
  destroyed: boolean;

  constructor(res: http.ServerResponse) {
    this.rawResponse = res;
    this.destroyed = false;
  }

  setStatus(status: number) {
    if (this.destroyed) this.responseDestroyed();
    this.rawResponse.writeHead(status);
    return this;
  }

  sendText(data: string) {
    if (this.destroyed) this.responseDestroyed();
    this.rawResponse.setHeader("Content-Type", "text/plain");
    this.rawResponse.write(data);
    return this;
  }

  sendHTML(htmlData: string) {
    if (this.destroyed) this.responseDestroyed();
    this.rawResponse.setHeader("Content-Type", "text/html");
    this.rawResponse.write(htmlData);
    return this;
  }

  sendJSON(jsonData: object) {
    if (this.destroyed) this.responseDestroyed();
    this.rawResponse.setHeader("Content-Type", "application/json");
    this.rawResponse.write(JSON.stringify(jsonData));
    return this;
  }

  sendFile(filePath: string) {
    if (this.destroyed) this.responseDestroyed();
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
    this.destroyed = true;
  }

  private responseDestroyed() {
    throw new Error("Cannot use response class after using end function.");
  }
}
