export interface Job {
  id: string
  titulo: string
  empresa: string
  ubicacion: string
  descripcion: string
  data: JobData
  content?: JobContent
}

export interface JobData {
  technology: string[]
  modalidad: string
  nivel: string
}

export interface JobContent {
  description: string
  responsibilities: string
  requirements: string
  about: string
}

export type CreateJobDTO = Omit<Job, "id">

export type UpdateJobDTO = Partial<CreateJobDTO>

export interface JobFilters {
  text?: string
  technology?: string
  type?: string
  level?: string
  limit?: number
  offset?: number
}

export interface PaginatedResponse {
  data: Job[]
  total: number
  limit: number
  offset: number
}

export interface ApiError {
  error: string
  details?: unknown[]
}
