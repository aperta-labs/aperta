declare function create<T extends object>(namespace: string, key: string, value: T, ttl: number): void;
declare function _delete(namespace: string, key: string): void;
declare function deleteAll(namespace: string): void;
declare function read<T extends object>(namespace: string, key: string): T | null;
export declare const store: {
    create: typeof create;
    delete: typeof _delete;
    deleteAll: typeof deleteAll;
    read: typeof read;
};
export {};
