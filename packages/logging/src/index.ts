import { log } from "./utilities/log";

export function logger(namespace: string) {
  return {
    info: (message: string) => log("INFO", namespace, message),
    error: (message: string) => log("ERROR", namespace, message),
    warn: (message: string) => log("WARN", namespace, message),
    debug: (message: string) => log("DEBUG", namespace, message),
    trace: (message: string) => log("TRACE", namespace, message),
  };
}
