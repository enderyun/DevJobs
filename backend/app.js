import express from "express"
import process from "process" // Es innecesario, pero ESLINT lo pide

import { DEFAULTS } from "./config.js"
import { corsMiddleware } from "./middlewares/cors.js"
import { jobsRouter } from "./routes/jobs.js"
import { aiRouter } from "./routes/ai.js"

const PORT = process.env.PORT || DEFAULTS.PORT
const app = express()

app.set('trust proxy', 1) // Detras de un proxy, es necesario para que rateLimit funcione correctamente
// con la IP real del cliente (como Vercel, Cloudflare, etc.)
app.use(corsMiddleware())
app.use(express.json()) // Parsear peticiones POST de body a json

app.use('/jobs', jobsRouter)
app.use('/ai', aiRouter)

// Por defecto es undefined.
// El cambio sirve para "production" y "test"
if (!process.env.NODE_ENV) { // procces.env.NODE_ENV === 'development' 
  app.listen(PORT, () => {
    console.log('El entorno actual es:', process.env.NODE_ENV);
    console.log(`Server running on port http://localhost:${PORT}`)
  })
}

export default app