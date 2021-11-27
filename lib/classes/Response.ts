import http from "http";
import fs from "fs";

export default class Response {
  private rawResponse: http.ServerResponse;

  constructor(res: http.ServerResponse) {
    this.rawResponse = res;
  }

  setStatus(status: number) {
    this.rawResponse.writeHead(status);
    return this;
  }

  send(data: string) {
    this.rawResponse.write(data);
    return this;
  }

  sendFile(filePath: string) {
    this.rawResponse.write(fs.readFileSync(filePath, "utf-8"));
    return this;
  }

  end(data?: any) {
    this.rawResponse.end(data);
    return null;
  }
}
