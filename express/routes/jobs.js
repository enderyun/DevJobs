import { Router } from "express"
import { JopController } from "../controllers/jobs.js"

export const jobsRouter = Router()

// CRUD
jobsRouter.get('/', JopController.getAll) 
jobsRouter.get('/:id', JopController.getById)
jobsRouter.post('/', JopController.create)
jobsRouter.put('/:id', JopController.update)
jobsRouter.patch('/:id', JopController.partialUpdate)
jobsRouter.delete('/:id', JopController.delete)