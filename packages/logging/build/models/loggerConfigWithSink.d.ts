import type { Log } from "./log";
export interface LoggerConfigWithSink {
    sink: (logs: Log[]) => void | Promise<void>;
    queue: number;
    formatter?: (log: Log) => string;
}
