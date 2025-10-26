import { sqlite } from "./sqlite";

export default async function store<T extends Object>(
  namespace: string,
  key: string,
  value: T
) {
  const jsonString = JSON.stringify(value);
  await sqlite.store(namespace, key, jsonString);
}
