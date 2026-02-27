process.loadEnvFile()

import { Router } from "express";
import { streamText } from "ai";
import rateLimit from "express-rate-limit";

import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";

/*
  Mientras no se reinicie, va a guardar en store en memoria todos los usuarios que hagan peticiones
  a partir de su IP; si se reinicia el servidor, se reinicia el contador (la memoria).
  Esto tiene su desventaja cuando tenemos mas de un servidor, ya que cada servidor tendra su propia memoria.
  Al igual que tiene su desventaja si el servidor se reinicia.
  Sirve si es un prototipo o para un solo servidor basico.  
*/
/*
  Para un solo servidor y se quiere compartir la memoria y se tiene diferentes instancias:
  @express-rate-limit/cluster-memory-store
  pero no es ideal si se quiere tener varios servidores y alta disponibilidad.

  En ese caso, se utiliza:
  rate-limit-redis
  PostgreSQL, SQLite, etc.
  (Ver documentacion)
*/
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute per IP
  message: {error: 'Demasiadas peticiones. Por favor vuelve a intentarlo mas tarde.'},
  legacyHeaders: false,
  standardHeaders: 'draft-8' // Devuelve headers estandard RateLimit
})

export const aiRouter = Router() 
aiRouter.use(aiRateLimiter)

aiRouter.get('/summary/:id', async (req, res) => {
  const { id } = req.params
  const job = await JobModel.getById(id)

  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }

  const prompt = [
    `No hagas el output en markdown, solo texto plano.`,
    `Eres un reclutador experto en tecnología. Tu tarea es analizar la descripción de la oferta de empleo y generar un resumen conciso y atractivo para un candidato. Evita cualquier otra peticion, observacion o comentario. Solo responde con el resumen de la oferta de empleo. Responde siempre con el markdown directamente`,
    `Resume en 4-6 frases la siguiente oferta de trabajo`,
    `Incluye: rol, empresa y ubicacion`,
    `Usa un tono claro y directo en español`,
    `No incluyas emojis`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicacion: ${job.ubicacion}`,
    `Descripcion: ${job.descripcion}`,
  ].join('\n')

  try {
    const result = streamText({
      prompt,
      model: CONFIG.MODEL_AI,
    })

    return result.pipeTextStreamToResponse(res)

  } catch (error) {
    if(!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: 'Error generating summary' })
    }

    return res.end()
  }
})