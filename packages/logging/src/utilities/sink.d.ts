import type { Log } from "../models/log.ts";
export declare let sinks: string[];
declare function create(namespace: string, callback: (log: Log) => Promise<void> | void): void;
export declare const sink: {
    create: typeof create;
};
export {};
