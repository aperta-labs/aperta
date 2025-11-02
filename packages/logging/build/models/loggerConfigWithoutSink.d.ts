import type { Log } from "./log";
export type LoggerConfigWithoutSink = {
    sink?: undefined;
    queue?: undefined;
    formatter?: (log: Log) => string;
};
