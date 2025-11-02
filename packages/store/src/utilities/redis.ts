import { createClient, type RedisClientType } from "redis";
import type { Logger } from "../models/logger.ts";

let client: RedisClientType | null = null;

function connection(url: string, logger?: Logger) {
  if (!client) {
    client = createClient({ url });

    client.on("error", (err: Error) => {
      logger?.error(`Redis Client Error: ${err.message}`);
    });

    client.connect().catch((err: Error) => {
      logger?.error(`Redis Connect Error: ${err.message}`);
    });
  }

  return client;
}

export function redis(url: string, logger?: Logger) {
  async function read<T>(key: string) {
    const client = connection(url, logger);
    const value = await client.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async function create<T>(
    key: string,
    value: T,
    expiryInSeconds?: number,
    namespace?: string
  ) {
    const client = connection(url, logger);
    const data = JSON.stringify(value ?? null);

    if (namespace) {
      await client.sAdd(namespace, key);
    }

    if (expiryInSeconds) {
      await client.set(key, data, { EX: expiryInSeconds });
    } else {
      await client.set(key, data);
    }
  }

  async function _delete(key: string, namespace?: string) {
    const client = connection(url, logger);

    if (namespace) {
      await client.sRem(namespace, key);
    }

    await client.del(key);
  }

  async function deleteAll(namespace: string) {
    const client = connection(url, logger);
    const keys = await client.sMembers(namespace);

    if (keys.length) {
      await Promise.all(keys.map((key) => client.del(key)));
      await client.del(namespace);
    }
  }

  async function publish(channel: string, message: string) {
    const client = connection(url, logger);
    await client.publish(channel, message);
  }

  async function subscribe(
    channel: string,
    onMessage: (message: string) => void | Promise<void>
  ) {
    const subscriber = createClient({ url });

    subscriber.on("error", (err: Error) => {
      logger?.error(`Redis Subscriber Error: ${err.message}`);
    });

    await subscriber.connect();

    await subscriber.subscribe(channel, async (message) => {
      await Promise.resolve(onMessage(message));
    });

    return async () => {
      await subscriber.unsubscribe(channel);
      await subscriber.quit();
    };
  }

  return {
    read,
    create,
    delete: _delete,
    deleteAll,
    publish,
    subscribe,
  };
}
