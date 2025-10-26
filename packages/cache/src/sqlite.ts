import { join } from "path";
import Database, { type Database as SqliteDatabase } from "better-sqlite3";

let databases: Record<string, SqliteDatabase> = {};

interface Row {
  key: string;
  value: string;
}

async function connection(namespace: string) {
  if (namespace in databases) {
    return databases[namespace];
  }
  const root = await process.cwd();
  const cacheDirectory = join(root, ".cache");
  const databasePath = join(cacheDirectory, `${namespace}.db`);
  databases[namespace] = new Database(databasePath);
  databases[namespace].pragma("journal_mode = MEMORY");
  databases[namespace].pragma("synchronous = OFF");
  databases[namespace].pragma("locking_mode = NORMAL");
  databases[namespace]
    .prepare(
      `
        CREATE TABLE IF NOT EXISTS store (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `
    )
    .run();
  return databases[namespace];
}

async function store(namespace: string, key: string, value: string) {
  const database = await connection(namespace);
  database
    .prepare(`INSERT OR REPLACE INTO store (key, value) VALUES (?, ?)`)
    .run(key, value);
}

async function get(namespace: string, key: string) {
  const database = await connection(namespace);
  const row = database
    .prepare(`SELECT value FROM store WHERE key = ?`)
    .get(key) as Row | null;
  if (row?.value) {
    return row?.value;
  }
  return null;
}

async function evict(namespace: string, key: string) {
  const database = await connection(namespace);
  database.prepare(`DELETE FROM store WHERE key = ?`).run(key);
}

export const sqlite = {
  store,
  get,
  evict,
};
