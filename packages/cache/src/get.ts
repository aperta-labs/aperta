import { sqlite } from "./sqlite";
import store from "./store";

export default async function get<T extends Object>(
  namespace: string,
  key: string,
  onNoHit: () => T | Promise<T>
) {
  const stored = await sqlite.get(namespace, key);
  if (stored) {
    const parsed = JSON.parse(stored) as T;
    return parsed;
  }
  const value = Promise.resolve(onNoHit);
  await store(namespace, key, value);
  return value;
}
