import * as z from "zod"

const jobSchema = z.object({
  titulo: z
    .string({ error: 'El título es obligatorio' })
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título debe tener menos de 100 caracteres'),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string(),
  data: z.object({
    technology: z.array(z.string().toLowerCase()),
    modalidad: z.string().toLowerCase(),
    nivel: z.string().toLowerCase()
  })
})

// for POST
export function validateJob(input) {
  return jobSchema.safeParse(input)
}

// for PUT and PATCH
export function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input)
}