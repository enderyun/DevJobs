import express from "express"
import ms from "ms" // para convertir el tiempo de ejecucion a un formato legible
import jobs from "./jobs.json" with { type: "json" }
import { DEFAULTS } from "./config.js"

const PORT = process.env.PORT || DEFAULTS.PORT
const app = express()

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

app.get('/get-jobs', (req, res) => {
  const { text, title, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

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
  return res.json(paginatedJobs)
})

app.get('/get-single-job/:id', (req, res) => {
  const { id } = req.params

  const idNumber = Number(id)


  return res.json({
    job: {
      id: idNumber,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '€50,000',
      description: 'We are looking for a Frontend Developer to join our team.'
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})


