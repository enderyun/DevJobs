import { DEFAULTS } from "../config.js"
import { JobModel } from "../models/job.js"

export class JobController {
  static async getAll(req, res) {
    const { text, level, type, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

    const {jobs, total} = await JobModel.getAll({text, level, type, technology, limit, offset})

    // Import dinamico que puede servir si tenemos una base de datos con
    // muchos empleos. En este caso es un archivo pequeño, asi que se usará
    // el import normal
    // const {default: jobs} = await import("./jobs.json", { with: { type: "json" } })
    return res.json({data: jobs, total, limit, offset})
  }

  static async getById(req, res) {
    const { id } = req.params

    const job = await JobModel.getById(id)

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    return res.json(job)
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data } = req.body

    const newJob = await JobModel.create({titulo, empresa, ubicacion, descripcion, data})

    return res.status(201).json(newJob)
  }

  static async update(req, res) {
    // TODO
  }

  static async partialUpdate(req, res) {
    // TODO
  }

  static async delete(req, res) {
    // TODO
  }
}