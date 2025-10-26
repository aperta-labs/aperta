import { eventEmitter } from "../constants/eventEmitter.ts";
import type { Log } from "../models/log.ts";

export let sinks: string[] = [];

function create(
  namespace: string,
  callback: (log: Log) => Promise<void> | void
) {
  sinks.push(namespace);
  eventEmitter.on(`@aperta/logging:sink:${namespace}`, callback);
}

export const sink = {
  create,
};
