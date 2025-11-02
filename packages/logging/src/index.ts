import { debug } from "./utilities/debug";
import { error } from "./utilities/error";
import { info } from "./utilities/info";
import { warn } from "./utilities/warn";

export function logger(namespace: string) {
  return {
    info: (message: string) => info(namespace, message),
    error: (message: string) => error(namespace, message),
    warn: (message: string) => warn(namespace, message),
    debug: (message: string) => debug(namespace, message),
  };
}
