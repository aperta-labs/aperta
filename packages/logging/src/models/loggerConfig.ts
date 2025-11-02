import type { LoggerConfigWithSink } from "./loggerConfigWithSink";
import type { LoggerConfigWithoutSink } from "./loggerConfigWithoutSink";

export type LoggerConfig = LoggerConfigWithSink | LoggerConfigWithoutSink;
