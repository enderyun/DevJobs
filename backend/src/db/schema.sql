-- DevJobs PostgreSQL schema
-- Simple structure aligned with the current jobs flow.

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY,
  titulo TEXT NOT NULL,
  empresa TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  modalidad TEXT NOT NULL,
  nivel TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS job_technologies (
  job_id UUID NOT NULL,
  technology TEXT NOT NULL,
  PRIMARY KEY (job_id, technology),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS job_content (
  job_id UUID PRIMARY KEY,
  description TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  requirements TEXT NOT NULL,
  about TEXT NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_jobs_titulo ON jobs (titulo);
CREATE INDEX IF NOT EXISTS idx_jobs_empresa ON jobs (empresa);
CREATE INDEX IF NOT EXISTS idx_jobs_modalidad ON jobs (modalidad);
CREATE INDEX IF NOT EXISTS idx_jobs_nivel ON jobs (nivel);
CREATE INDEX IF NOT EXISTS idx_job_technologies_technology ON job_technologies (technology);
