import crypto from "node:crypto"
import { db } from "../db/database.js"
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters, PaginatedResponse } from "../types.js"

export class JobModel {
  static async getAll(filters: JobFilters): Promise<PaginatedResponse> {
    const conditions: string[] = []
    const params: unknown[] = []

    if (filters.text) {
      conditions.push("(j.titulo LIKE ? OR j.descripcion LIKE ?)")
      const like = `%${filters.text}%`
      params.push(like, like)
    }

    if (filters.technology) {
      conditions.push("EXISTS (SELECT 1 FROM job_technologies jt WHERE jt.job_id = j.id AND jt.technology = ?)")
      params.push(filters.technology)
    }

    if (filters.type) {
      conditions.push("j.modalidad = ?")
      params.push(filters.type)
    }

    if (filters.level) {
      conditions.push("j.nivel = ?")
      params.push(filters.level)
    }

    const where = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""

    const limit = Math.max(1, Number(filters.limit) || 10)
    const offset = Math.max(0, Number(filters.offset) || 0)

    const countRow = db.prepare(`SELECT COUNT(*) as total FROM jobs j ${where}`).get(...params) as { total: number }

    const rows = db.prepare(`
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
      ${where}
      GROUP BY j.id
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset) as Array<Record<string, unknown>>

    const data = rows.map(row => ({
      id: row.id as string,
      titulo: row.titulo as string,
      empresa: row.empresa as string,
      ubicacion: row.ubicacion as string,
      descripcion: row.descripcion as string,
      data: {
        technology: (row.technologies as string)?.split(",") || [],
        modalidad: row.modalidad as string,
        nivel: row.nivel as string
      }
    }))

    return { data, total: countRow.total, limit, offset }
  }

  static async getById(id: string): Promise<Job | null> {
    const row = db.prepare(`
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
      WHERE j.id = ?
      GROUP BY j.id
    `).get(id) as Record<string, unknown> | undefined

    if (!row) return null

    const contentRow = db.prepare("SELECT * FROM job_content WHERE job_id = ?").get(id) as Record<string, unknown> | undefined

    return {
      id: row.id as string,
      titulo: row.titulo as string,
      empresa: row.empresa as string,
      ubicacion: row.ubicacion as string,
      descripcion: row.descripcion as string,
      data: {
        technology: (row.technologies as string)?.split(",") || [],
        modalidad: row.modalidad as string,
        nivel: row.nivel as string
      },
      content: contentRow ? {
        description: contentRow.description as string,
        responsibilities: contentRow.responsibilities as string,
        requirements: contentRow.requirements as string,
        about: contentRow.about as string
      } : undefined
    }
  }

  static async create(input: CreateJobDTO): Promise<Job> {
    const id = crypto.randomUUID()

    const tx = db.transaction(() => {
      db.prepare(`
        INSERT INTO jobs (id, titulo, empresa, ubicacion, descripcion, modalidad, nivel)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, input.titulo, input.empresa, input.ubicacion, input.descripcion, input.data.modalidad, input.data.nivel)

      for (const tech of input.data.technology) {
        db.prepare("INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)").run(id, tech)
      }

      if (input.content) {
        db.prepare(`
          INSERT INTO job_content (job_id, description, responsibilities, requirements, about)
          VALUES (?, ?, ?, ?, ?)
        `).run(id, input.content.description, input.content.responsibilities, input.content.requirements, input.content.about)
      }
    })

    tx()

    return { id, ...input }
  }

  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const existing = await this.getById(id)
    if (!existing) return null

    const merged: Job = {
      ...existing,
      ...input,
      data: { ...existing.data, ...input.data }
    }

    const tx = db.transaction(() => {
      db.prepare(`
        UPDATE jobs SET titulo=?, empresa=?, ubicacion=?, descripcion=?, modalidad=?, nivel=?
        WHERE id=?
      `).run(merged.titulo, merged.empresa, merged.ubicacion, merged.descripcion, merged.data.modalidad, merged.data.nivel, id)

      if (input.data?.technology) {
        db.prepare("DELETE FROM job_technologies WHERE job_id=?").run(id)
        for (const tech of input.data.technology) {
          db.prepare("INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)").run(id, tech)
        }
      }

      if (input.content) {
        db.prepare(`
          INSERT INTO job_content (job_id, description, responsibilities, requirements, about)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(job_id) DO UPDATE SET
            description=excluded.description,
            responsibilities=excluded.responsibilities,
            requirements=excluded.requirements,
            about=excluded.about
        `).run(id, input.content.description, input.content.responsibilities, input.content.requirements, input.content.about)
      }
    })

    tx()

    return merged
  }

  static async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id)
    if (!existing) return false

    db.transaction(() => {
      db.prepare("DELETE FROM job_technologies WHERE job_id=?").run(id)
      db.prepare("DELETE FROM job_content WHERE job_id=?").run(id)
      db.prepare("DELETE FROM jobs WHERE id=?").run(id)
    })()

    return true
  }
}
