import jobs from "../data/jobs.json" with { type: "json" }
import { DEFAULTS } from "../config.js"

export class JobModel {
  static async getAll({text, level, type, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET}) {
    
    let filteredJobs = jobs

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(job => 
        job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
      )
    }

    if (technology) {
        filteredJobs = filteredJobs.filter(job => 
          job.data.technology.includes(technology)
      )
    }

    if (level) {
      filteredJobs = filteredJobs.filter(job => 
        job.data.nivel.includes(level)
      )
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => 
        job.data.modalidad.includes(type)
      )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return {
      jobs: paginatedJobs, 
      total: filteredJobs.length 
    }
  }

  static async getById(id) {
    const job = jobs.find(job => job.id === id)
    return job
  }

  static async create({titulo, empresa, ubicacion, descripcion, data}) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data
    }

    jobs.push(newJob) // Se hace en una base de datos con un INSERT

    return newJob
  }
}
