import Database from 'better-sqlite3'
import type { Database as DatabaseType } from 'better-sqlite3'

export const db: DatabaseType = new Database('jobs.db')

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
