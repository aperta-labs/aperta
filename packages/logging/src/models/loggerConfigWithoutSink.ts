import type { Log } from "./log";

export interface LoggerConfigWithoutSink {
  sink?: undefined;
  queue?: undefined;
  formatter?: (log: Log) => string;
}
