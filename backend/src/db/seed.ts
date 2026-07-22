import { db } from "./database.js"
import jobs from "../data/jobs.json" with { type: "json" }

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    empresa TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    modalidad TEXT NOT NULL,
    nivel TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS job_technologies (
    job_id TEXT NOT NULL,
    technology TEXT NOT NULL,
    PRIMARY KEY (job_id, technology),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS job_content (
    job_id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    requirements TEXT NOT NULL,
    about TEXT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
  );
`)

const existingCount = (db.prepare("SELECT COUNT(*) as count FROM jobs").get() as { count: number }).count

if (existingCount > 0) {
  console.log(`Base de datos ya contiene ${existingCount} jobs, saltando seed`)
} else {
  const insertJob = db.prepare(`
    INSERT OR IGNORE INTO jobs (id, titulo, empresa, ubicacion, descripcion, modalidad, nivel)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const insertTech = db.prepare(`
    INSERT OR IGNORE INTO job_technologies (job_id, technology) VALUES (?, ?)
  `)

  const insertContent = db.prepare(`
    INSERT OR IGNORE INTO job_content (job_id, description, responsibilities, requirements, about)
    VALUES (?, ?, ?, ?, ?)
  `)

  const seed = db.transaction(() => {
    for (const job of jobs) {
      insertJob.run(
        job.id, job.titulo, job.empresa, job.ubicacion, job.descripcion,
        job.data.modalidad,
        job.data.nivel
      )

      if (Array.isArray(job.data.technology)) {
        for (const tech of job.data.technology) {
          insertTech.run(job.id, tech)
        }
      }

      if (job.content) {
        insertContent.run(
          job.id, job.content.description, job.content.responsibilities,
          job.content.requirements, job.content.about
        )
      }
    }
  })

  seed()
  console.log(`Base de datos inicializada con ${jobs.length} jobs`)
}
