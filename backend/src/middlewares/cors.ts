import cors from "cors"

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (acceptedOrigins.includes(origin ?? "") || !origin) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    }
  })
}
