import { store } from "./store.ts";

export async function get<T extends Object>(
  namespace: string,
  key: string,
  ttl: number,
  onNoHit: () => T | Promise<T>
) {
  const storedValue = store.read<T>(namespace, key);
  if (storedValue) {
    return storedValue;
  }
  const value = Promise.resolve(onNoHit);
  store.create(namespace, key, value, ttl);
  return value;
}
