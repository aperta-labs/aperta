import type { Logger } from "../models/logger.ts";
import { redis } from "./redis.ts";

type Item = {
  value: object;
  expires: Date;
};
const data: Record<string, Record<string, Item>> = {};

export function store(namespace: string, redisUrl: string, logger?: Logger) {
  const CHANNEL = `@aperta/cache:channel:${namespace}`;
  const remoteCache = redis(redisUrl, logger);

  function ttlToExpires(ttl: number) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + ttl);
    return date;
  }

  async function create<T extends object>(key: string, value: T, ttl: number) {
    if (!data[namespace]) data[namespace] = {};
    data[namespace][key] = { value, expires: ttlToExpires(ttl) };
    await remoteCache.create(key, value, ttl);
    const event = JSON.stringify({ type: "create", key, value, ttl });
    await remoteCache.publish(CHANNEL, event);
  }

  async function _delete(key: string) {
    if (data[namespace]) {
      delete data[namespace][key];
    }
    await remoteCache.delete(key);
    const event = JSON.stringify({ type: "delete", key });
    await remoteCache.publish(CHANNEL, event);
  }

  async function deleteAll() {
    delete data[namespace];
  }

  async function read<T extends object>(key: string): Promise<T | null> {
    const namespaceStore = data[namespace];
    if (namespaceStore && key in namespaceStore) {
      const item = namespaceStore[key];
      if (new Date() < item.expires) return item.value as T;
      delete namespaceStore[key];
    }
    const remoteValue = await remoteCache.read<T>(key);
    if (remoteValue) {
      data[namespace] = data[namespace] || {};
      data[namespace][key] = {
        value: remoteValue,
        expires: ttlToExpires(60),
      };
    }
    return remoteValue;
  }

  async function subscriber() {
    await remoteCache.subscribe(CHANNEL, async (message: string) => {
      try {
        const event = JSON.parse(message);
        if (event.type === "create") {
          if (!data[namespace]) data[namespace] = {};
          data[namespace][event.key] = {
            value: event.value,
            expires: ttlToExpires(event.ttl ?? 60),
          };
        } else if (event.type === "delete") {
          if (data[namespace]) delete data[namespace][event.key];
        }
      } catch (error) {
        logger?.error((error as Error).message);
      }
    });
  }

  subscriber().catch(logger?.error);

  return {
    create,
    delete: _delete,
    deleteAll,
    read,
  };
}
