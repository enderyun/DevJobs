import { createServer } from "node:http"
import ms from "ms"

process.loadEnvFile() 
const port = process.env.PORT ?? 0

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const server = createServer((req, res) => {
  const { method, url } = req

  if (method !== 'GET') {
    return sendJson(res, 405, { error: 'Method Not Allowed' })
  }

  if (url === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.statusCode = 200
    return res.end('Hola desde Node.js!\n')
  }

  if (url === '/users') {
    return sendJson(res, 200, [
      { id: 1, name: 'chris'}, 
      { id: 2, name: 'denise'}
    ])
  }

  if (url === '/health') {
    return sendJson(res, 200, { status: 'ok', uptime: ms(process.uptime() * 1000)})
  }

  return sendJson(res, 404, 'Not Found')
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Server running at http://localhost:${address.port}/`)
})
