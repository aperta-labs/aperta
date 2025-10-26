import { page as _page } from "./page";
import crypto from "node:crypto";

let _triggers: Record<string, number> = {};

export function rule(args: { triggers: number; page: string }) {
  const uuid = crypto.randomUUID();
  const { triggers, page } = args;

  _triggers[uuid] = 0;

  return {
    trigger: () => {
      _triggers[uuid]++;
      if (_triggers[uuid] > triggers) {
        _page(page);
      }
    },
  };
}
