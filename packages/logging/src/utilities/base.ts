import { eventEmitter } from "../constants/eventEmitter";
import { sinks } from "./sink";

export function base(level: string, namespace: string, message: string) {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const customString = `${year}-${month}-${day} ${hours}:${minutes}`;
  console.log(`${customString} [${level}] [${namespace}] ${message}`);
  if (namespace in sinks) {
    eventEmitter.emit(`@aperta/logging:sink:${namespace}`, {
      pid: process.pid,
      date,
      message,
      level,
    });
  }
}
