import { invalidate } from "./utilities/invalidate";
import { get } from "./utilities/get";
import { set } from "./utilities/set";
import { invalidateAll } from "./utilities/invalidateAll";

export function cache<T extends object>(
  namespace: string,
  args: { ttl: number }
) {
  const { ttl } = args;
  function _get(key: string, onNoHit: () => Promise<T> | T) {
    return get(namespace, key, ttl, onNoHit) as T;
  }

  function _invalidate(key: string) {
    return invalidate(namespace, key);
  }

  function _invalidateAll() {
    return invalidateAll(namespace);
  }

  function _set(key: string, value: T) {
    set(namespace, key, value, ttl);
  }

  return {
    get: _get,
    invalidate: _invalidate,
    invalidateAll: _invalidateAll,
    set: _set,
  };
}
