import { eventEmitter } from "../constants/eventEmitter";

export function page(key: string) {
  eventEmitter.emit(`@aperta/pager:page:${key}`);
}
