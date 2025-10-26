import { _flags } from "./seed";

export function check(namespace: string, flag: string) {
  if (flag in _flags) {
    return _flags[namespace];
  }
}
