import express from "express"
import ms from "ms" // para convertir el tiempo de ejecucion a un formato legible

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (request, response) => {
  return response.send('Hello World!')
})

app.get('/health', (request, response) => {
  return response.json({ 
    status: 'ok', 
    uptime: ms(process.uptime() * 1000) 
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})


