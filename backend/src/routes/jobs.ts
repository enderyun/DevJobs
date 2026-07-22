import { Router, type Router as RouterType } from "express"
import { JobController } from "../controllers/jobs.js"
import { validateCreateJob, validateUpdateJob } from "../middlewares/validation.js"

export const jobsRouter: RouterType = Router()

jobsRouter.get("/", JobController.getAll)
jobsRouter.get("/:id", JobController.getById)
jobsRouter.post("/", validateCreateJob, JobController.create)
jobsRouter.put("/:id", validateUpdateJob, JobController.update)
jobsRouter.patch("/:id", validateUpdateJob, JobController.update)
jobsRouter.delete("/:id", JobController.delete)
