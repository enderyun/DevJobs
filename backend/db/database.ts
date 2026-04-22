import Database from 'better-sqlite3'

const db = new Database('jobs.db')

db.pragma('journal_mode = WAL') // Mejora concurrencia
db.pragma('foreign_keys = ON') // Habilita claves foráneas

export { db }
