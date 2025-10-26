import { _flags } from "./seed";

export function set(namespace: string, key: string, value: boolean) {
  _flags[namespace][key] = value;
}
