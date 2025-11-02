import { error, warn, info, trace, debug } from "console";
import type { LoggerConfig } from "../models/loggerConfig";
import type { LoggerConfigWithoutSink } from "../models/loggerConfigWithoutSink";
import type { LoggerConfigWithSink } from "../models/loggerConfigWithSink";
import { log } from "../utilities/log";
import type { Log } from "../models/log";

export function logger(
  namespace: string,
  config?: LoggerConfigWithoutSink
): {
  info: (msg: string) => void;
  error: (msg: string) => void;
  warn: (msg: string) => void;
  debug: (msg: string) => void;
  trace: (msg: string) => void;
};

export function logger(namespace: string, config?: LoggerConfig) {
  const sinkQueue: Log[] = [];

  async function queuedSink(log: Log) {
    if (config?.sink) {
      sinkQueue.push(log);
      if (config?.queue && sinkQueue.length >= config.queue) {
        await Promise.resolve(config.sink(sinkQueue));
      }
    }
  }

  function defaultFormatter(log: Log) {
    return `${log.date.toDateString()} [${log.level}] [${log.namespace}] ${
      log.pid
    } ${log.message}`;
  }

  const formatter = config?.formatter || defaultFormatter;

  return {
    info: (message: string) =>
      log(
        info,
        "INFO",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    error: (message: string) =>
      log(
        error,
        "ERROR",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    warn: (message: string) =>
      log(
        warn,
        "WARN",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    debug: (message: string) =>
      log(
        debug,
        "DEBUG",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    trace: (message: string) =>
      log(
        trace,
        "TRACE",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
  };
}
