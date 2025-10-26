type Item = {
  value: object;
  expires: Date;
};
const data: Record<string, Record<string, Item>> = {};

function create<T extends object>(
  namespace: string,
  key: string,
  value: T,
  ttl: number
) {
  function ttlToExpires() {
    const date = new Date();
    date.setSeconds(date.getSeconds() + ttl);
    return date;
  }
  if (!data[namespace]) data[namespace] = {};
  data[namespace][key] = { value, expires: ttlToExpires() };
}

function _delete(namespace: string, key: string) {
  if (namespace in store) {
    if (key) {
      delete data[namespace][key];
    }
  }
}

function deleteAll(namespace: string) {
  delete data[namespace];
}

function read<T extends object>(namespace: string, key: string) {
  if (namespace in data) {
    if (key in data[namespace]) {
      const item = data[namespace][key] as Item;
      if (new Date() > item.expires) {
        delete data[namespace][key];
        return null;
      }
      return item.value as T;
    }
    return null;
  }
  return null;
}

export const store = {
  create,
  delete: _delete,
  deleteAll,
  read,
};
