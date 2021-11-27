import http from "http";
declare const _default: (req: http.IncomingMessage) => {
    aborted: boolean;
    httpVersion: string;
    httpVersionMajor: number;
    httpVersionMinor: number;
    complete: boolean;
    connection: import("net").Socket;
    socket: import("net").Socket;
    headers: http.IncomingHttpHeaders;
    rawHeaders: string[];
    trailers: NodeJS.Dict<string>;
    rawTrailers: string[];
    method?: string | undefined;
    url?: string | undefined;
    statusCode?: number | undefined;
    statusMessage?: string | undefined;
    readableAborted: boolean;
    readable: boolean;
    readableDidRead: boolean;
    readableEncoding: BufferEncoding | null;
    readableEnded: boolean;
    readableFlowing: boolean | null;
    readableHighWaterMark: number;
    readableLength: number;
    readableObjectMode: boolean;
    destroyed: boolean;
    off(eventName: string | symbol, listener: (...args: any[]) => void): http.IncomingMessage;
    removeAllListeners(event?: string | symbol | undefined): http.IncomingMessage;
    setMaxListeners(n: number): http.IncomingMessage;
    getMaxListeners(): number;
    listeners(eventName: string | symbol): Function[];
    rawListeners(eventName: string | symbol): Function[];
    listenerCount(eventName: string | symbol): number;
    eventNames(): (string | symbol)[];
};
export default _default;
