import type { LoggerConfig } from "../models/loggerConfig";
export declare function logger(namespace: string, config?: LoggerConfig): {
    custom: (level: Uppercase<string>, message: string, extras?: object) => void;
    info: (message: string, extras?: object) => void;
    error: (message: string, extras?: object) => void;
    warn: (message: string, extras?: object) => void;
    debug: (message: string, extras?: object) => void;
    trace: (message: string, extras?: object) => void;
};
