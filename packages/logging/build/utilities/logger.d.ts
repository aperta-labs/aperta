import type { LoggerConfigWithoutSink } from "../models/loggerConfigWithoutSink";
export declare function logger(namespace: string, config?: LoggerConfigWithoutSink): {
    info: (msg: string) => void;
    error: (msg: string) => void;
    warn: (msg: string) => void;
    debug: (msg: string) => void;
    trace: (msg: string) => void;
};
