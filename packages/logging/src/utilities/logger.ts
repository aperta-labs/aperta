import { error, warn, info, trace, debug, log } from "console";
import type { LoggerConfig } from "../models/loggerConfig";
import { log as _log } from "../utilities/log";
import type { Log } from "../models/log";

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
    custom: (level: Uppercase<string>, message: string) =>
      _log(
        log,
        level,
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    info: (message: string) =>
      _log(
        info,
        "INFO",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    error: (message: string) =>
      _log(
        error,
        "ERROR",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    warn: (message: string) =>
      _log(
        warn,
        "WARN",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    debug: (message: string) =>
      _log(
        debug,
        "DEBUG",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
    trace: (message: string) =>
      _log(
        trace,
        "TRACE",
        namespace,
        message,
        formatter,
        config?.sink ? queuedSink : undefined
      ),
  };
}
