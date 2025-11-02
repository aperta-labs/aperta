import type { Logger } from "../models/logger.ts";
export declare function redis(url: string, logger?: Logger): {
    read: <T>(key: string) => Promise<T | null>;
    create: <T>(key: string, value: T, expiryInSeconds?: number, namespace?: string) => Promise<void>;
    delete: (key: string, namespace?: string) => Promise<void>;
    deleteAll: (namespace: string) => Promise<void>;
    publish: (channel: string, message: string) => Promise<void>;
    subscribe: (channel: string, onMessage: (message: string) => void | Promise<void>) => Promise<() => Promise<void>>;
};
