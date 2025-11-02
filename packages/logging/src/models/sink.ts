import type { Log } from "./log";

export type Sink = (log: Log) => void | Promise<void>;
