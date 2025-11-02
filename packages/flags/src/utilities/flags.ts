import type { FlagsConfig } from "../models/flagsConfig";
import { check } from "../utilities/check";

export async function flags<const T extends Storage>(
  namespace: string,
  config: FlagsConfig<T>
) {
  let storage = await Promise.resolve(config.source());
  async function refresh() {
    storage = await Promise.resolve(config.source());
  }

  async function _check(flag: string) {
    if (config.ttl) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + config.ttl);
      const now = new Date();
      if (now >= expires) {
        await refresh();
      }
    }
    check(namespace, flag, storage);
  }

  return {
    check: (flag: keyof typeof storage) => _check(flag as string),
    refresh,
    storage,
  };
}
