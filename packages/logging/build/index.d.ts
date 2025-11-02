import type { Log } from "./models/log";
import type { LoggerConfigWithoutSink } from "./models/loggerConfigWithoutSink";
import type { LoggerConfigWithSink } from "./models/loggerConfigWithSink";
export type { Log };
export declare function logger(namespace: string, config: LoggerConfigWithSink): {
    info: (msg: string) => Promise<void>;
    error: (msg: string) => Promise<void>;
    warn: (msg: string) => Promise<void>;
    debug: (msg: string) => Promise<void>;
    trace: (msg: string) => Promise<void>;
};
export declare function logger(namespace: string, config?: LoggerConfigWithoutSink): {
    info: (msg: string) => void;
    error: (msg: string) => void;
    warn: (msg: string) => void;
    debug: (msg: string) => void;
    trace: (msg: string) => void;
};
