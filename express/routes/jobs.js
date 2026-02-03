import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function validateCreate (req, res, next) {
  const result = validateJob(req.body)

  if (!result.success) {
    return res.status(400).json({ error: 'Invalid request', details: result.error.errors })
  }

  req.body = result.data
  return next()
}

function validateUpdate (req, res, next) {
  const result = validatePartialJob(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.stringify(result.error.errors) })
  }

  req.body = result.data
  return next()
}


// CRUD
jobsRouter.get('/', JobController.getAll) 
jobsRouter.get('/:id', JobController.getById)
jobsRouter.post('/', validateCreate, JobController.create)
jobsRouter.put('/:id', validateUpdate, JobController.update)
jobsRouter.patch('/:id', JobController.partialUpdate)
jobsRouter.delete('/:id', JobController.delete)