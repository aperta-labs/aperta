import { store } from "./store";

export function set<T extends Object>(
  namespace: string,
  key: string,
  value: T,
  ttl: number
) {
  store.create(namespace, key, value, ttl);
}
