import { sqlite } from "./sqlite";

export default async function evict(namespace: string, key: string) {
  await sqlite.evict(namespace, key);
}
