import { eventEmitter } from "../constants/eventEmitter";

export function listen(key: string, callback: () => void | Promise<void>) {
  eventEmitter.on(`@aaperta/pager:page:${key}`, callback);
}
