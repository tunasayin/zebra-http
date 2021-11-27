export default interface AppOptions {
    debug: boolean;
    useSSL: boolean | undefined;
    keys: {
        key: string;
        cert: string;
        ca: string;
    } | undefined;
}
