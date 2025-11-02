export function check(namespace: string, flag: string, storage: Storage) {
  if (flag in storage) {
    return storage[namespace];
  }
}
