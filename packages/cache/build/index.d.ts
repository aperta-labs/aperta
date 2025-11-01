export declare function cache<T extends object>(namespace: string, args: {
    ttl: number;
}): {
    get: (key: string, onNoHit: () => Promise<T> | T) => T;
    invalidate: (key: string) => void;
    invalidateAll: () => void;
    set: (key: string, value: T) => void;
};
