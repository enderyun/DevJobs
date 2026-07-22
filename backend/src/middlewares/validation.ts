import type { Request, Response, NextFunction } from "express"
import { validateJob, validatePartialJob } from "../schemas/job.js"

export const validateCreateJob = (req: Request, res: Response, next: NextFunction): void => {
  const result = validateJob(req.body)

  if (!result.success) {
    res.status(400).json({
      message: "Validation error",
      errors: result.error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message
      }))
    })
    return
  }

  req.body = result.data
  next()
}

export const validateUpdateJob = (req: Request, res: Response, next: NextFunction): void => {
  const result = validatePartialJob(req.body)

  if (!result.success) {
    res.status(400).json({
      message: "Validation error",
      errors: result.error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message
      }))
    })
    return
  }

  req.body = result.data
  next()
}
