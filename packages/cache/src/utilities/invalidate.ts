import { store } from "./store";

export function invalidate(namespace: string, key: string) {
  store.delete(namespace, key);
}
