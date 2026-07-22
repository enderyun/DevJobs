import { z } from "zod"

export const jobDataSchema = z.object({
  technology: z.array(z.string()),
  modalidad: z.string(),
  nivel: z.string()
})

export const jobContentSchema = z.object({
  description: z.string(),
  responsibilities: z.string(),
  requirements: z.string(),
  about: z.string()
})

export const jobSchema = z.object({
  titulo: z
    .string({ error: "El título es obligatorio" })
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título debe tener menos de 100 caracteres"),
  empresa: z.string({ error: "La empresa es obligatoria" }),
  ubicacion: z.string({ error: "La ubicación es obligatoria" }),
  descripcion: z.string(),
  data: jobDataSchema,
  content: jobContentSchema.optional()
})

export type JobInput = z.infer<typeof jobSchema>
export type JobDataInput = z.infer<typeof jobDataSchema>
export type JobContentInput = z.infer<typeof jobContentSchema>

export function validateJob(input: unknown) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input: unknown) {
  return jobSchema.partial().safeParse(input)
}
