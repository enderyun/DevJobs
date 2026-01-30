import express from "express"
import process from "process" // Es innecesario, pero ESLINT lo pide

import { DEFAULTS } from "./config.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { jobsRouter } from "./routes/jobs.js"

const PORT = process.env.PORT || DEFAULTS.PORT
const app = express()

app.use(corsMiddleware())

app.use(express.json()) // Parsear peticiones POST de body a json

app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})