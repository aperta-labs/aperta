import type { Logger } from "../models/logger.ts";
export declare function cache(namespace: string, redisUrl: string, logger?: Logger): {
    create: <T extends object>(key: string, value: T, ttl: number) => Promise<void>;
    delete: (key: string) => Promise<void>;
    deleteAll: () => Promise<void>;
    read: <T extends object>(key: string) => Promise<T | null>;
};
