export interface FlagsConfig<T> {
  source: () => T | Promise<T>;
  ttl?: number;
}
