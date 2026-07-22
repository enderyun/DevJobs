import type { Request, Response } from "express"
import { DEFAULTS } from "../config.js"
import { JobModel } from "../models/job.js"

function qs(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined
}

export class JobController {
  static async getAll(req: Request, res: Response) {
    const { text, level, type, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

    const result = await JobModel.getAll({
      text: qs(text),
      level: qs(level),
      type: qs(type),
      technology: qs(technology),
      limit: Number(limit),
      offset: Number(offset)
    })

    return res.json(result)
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id

    const job = await JobModel.getById(id)

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    return res.json(job)
  }

  static async create(req: Request, res: Response) {
    const newJob = await JobModel.create(req.body)

    return res.status(201).json(newJob)
  }

  static async update(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id
    const updated = await JobModel.update(id, req.body)

    if (!updated) {
      return res.status(404).json({ error: "Job not found" })
    }

    return res.json(updated)
  }

  static async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id
    const deleted = await JobModel.delete(id)

    if (!deleted) {
      return res.status(404).json({ error: "Job not found" })
    }

    return res.status(204).send()
  }
}
