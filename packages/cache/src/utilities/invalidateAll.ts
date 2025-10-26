import { store } from "./store";

export function invalidateAll(namespace: string) {
  store.deleteAll(namespace);
}
