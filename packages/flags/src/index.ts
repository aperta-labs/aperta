import { check } from "./utilities/check";
import { seed } from "./utilities/seed";
import { set } from "./utilities/set";

export function flags<const T extends Record<string, boolean>>(
  namespace: string,
  initialFlags: T
) {
  seed(namespace, initialFlags);

  function _check(flag: keyof T) {
    return check(namespace, flag as string);
  }

  function _set(flag: keyof T, value: boolean) {
    set(namespace, flag as string, value);
  }

  return {
    check: _check,
    set: _set,
  };
}
