
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
 if (db) return;
  db = await SQLite.openDatabaseAsync('gorin.db');

  await db.execAsync(
    `BEGIN;
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      duration INTEGER NOT NULL,
      intensity TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER,
      title TEXT NOT NULL,
      content TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      is_favorite INTEGER DEFAULT (0)
    );
    
    COMMIT;`
  );
};

export const getDB = () => db;