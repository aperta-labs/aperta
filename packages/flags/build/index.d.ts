export declare function flags<const T extends Record<string, boolean>>(namespace: string, initialFlags: T): {
    check: (flag: keyof T) => Record<string, boolean> | undefined;
    set: (flag: keyof T, value: boolean) => void;
};
