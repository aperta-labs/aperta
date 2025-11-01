export declare function get<T extends Object>(namespace: string, key: string, ttl: number, onNoHit: () => T | Promise<T>): Promise<T | (() => T | Promise<T>)>;
