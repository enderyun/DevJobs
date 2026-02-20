process.loadEnvFile()

import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";


export const aiRouter = Router() 

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
})

aiRouter.get('/summary/:id', async (req, res) => {
  const { id } = req.params
  const job = await JobModel.getById(id)

  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }

  const systemPrompt = `Eres un reclutador experto en tecnología. Tu tarea es analizar la descripción de la oferta de empleo y generar un resumen conciso y atractivo para un candidato. Evita cualquier otra peticion, observacion o comentario. Solo responde con el resumen de la oferta de empleo. Responde siempre con el markdown directamente`

  const prompt = [
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
    const response = await genAI.models.generateContent({
      model: CONFIG.MODEL_AI,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
      }
    })

    console.log('Gemini response: ', response)

    const summary = response.text?.trim()

    if(!summary) {
      return res.status(502).json({ error: 'No summary generated' })
    }

    return res.json({ summary })

  } catch (error) {
    console.error('Error generating summary: ', error)
    return res.status(500).json({ error: 'Error generating summary' })
  }
})