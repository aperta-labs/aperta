export let _flags: Record<string, Record<string, boolean>> = {};

export function seed(namespace: string, flags: Record<string, boolean>) {
  if (!_flags[namespace]) _flags[namespace] = {};
  _flags[namespace] = flags;
}
