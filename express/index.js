import express from "express"
import ms from "ms" // para convertir el tiempo de ejecucion a un formato legible
import process from "process" // Es innecesario, pero ESLINT lo pide
import cors from "cors"

import jobs from "./jobs.json" with { type: "json" }
import { DEFAULTS } from "./config.js"


const PORT = process.env.PORT || DEFAULTS.PORT
const app = express()


const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
]

app.use(cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true) 
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  }
}))


app.use(express.json()) // Parsear peticiones POST de body a json

app.use((req, res, next) => { 
  const timeString = new Date().toLocaleTimeString()
  console.log(`[${timeString}] ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.get('/health', (req, res) => {
  return res.json({ 
    status: 'ok', 
    uptime: ms(process.uptime() * 1000) 
  })
})

app.get('/jobs', (req, res) => {
  const { text, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

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

  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

  // Import dinamico que puede servir si tenemos una base de datos con
  // muchos empleos. En este caso es un archivo pequeño, asi que se usará
  // el import normal
  // const {default: jobs} = await import("./jobs.json", { with: { type: "json" } })
  return res.json({data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber})
})

app.get('/jobs/:id', (req, res) => {
  const { id } = req.params

  const job = jobs.find(job => job.id === id)

  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }

  return res.json(job)
})

app.post('/jobs', (req, res) => {
  const { titulo, empresa, ubicacion, descripcion, data } = req.body

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data
  }

  jobs.push(newJob) // Se hace en una base de datos con un INSERT

  return res.status(201).json(newJob)
})

app.put('/jobs/:id', (req, res) => {
  const { id } = req.params
  const { titulo, empresa, ubicacion, descripcion, data } = req.body

  

})

app.patch('/jobs/:id', (req, res) => {
  // TODO
})

app.delete('/jobs/:id', (req, res) => {
  // TODO
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})


