import http from "http";
import fs from "fs";

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
    this.rawResponse.write(fs.readFileSync(filePath, "utf-8"));
    return this;
  }

  end(data?: any): void {
    this.rawResponse.end(data);
  }
}
