import "./db/seed.js"

import express, { type Express } from "express"
import process from "process"

import { DEFAULTS } from "./config.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { jobsRouter } from "./routes/jobs.js"

const PORT = process.env.PORT || DEFAULTS.PORT
const app: Express = express()

app.set("trust proxy", 1)
app.use(corsMiddleware())
app.use(express.json())

app.use("/jobs", jobsRouter)

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log("El entorno actual es:", process.env.NODE_ENV)
    console.log(`Server running on port http://localhost:${PORT}`)
  })
}

export default app
