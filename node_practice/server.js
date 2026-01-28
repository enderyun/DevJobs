import { createServer } from "node:http"
import { json } from "node:stream/consumers"
import { randomUUID } from "node:crypto"
import ms from "ms"

process.loadEnvFile() 
const port = process.env.PORT ?? 0

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const users = [
  { id: 1, name: 'Chris'}, 
  { id: 2, name: 'Denise'}
]

const server = createServer(async (req, res) => {
  const { method, url } = req

  const [pathname, querystrings] = url.split('?')

  const searchParams = new URLSearchParams(querystrings)

  if (method === 'GET') {
    if (pathname === '/users') {

      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)
      return sendJson(res, 200, paginatedUsers)
    }
  
    if (pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: ms(process.uptime() * 1000)})
    }
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      const body = await json(req)
      console.log(body)

      if (!body || !body.name) {
        return sendJson(res, 400, { message: 'Name is required' })
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
      }

      users.push(newUser)
      return sendJson(res, 201, { message: 'User created' })
    }
  }

  if (pathname === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.statusCode = 200
    return res.end('Hello World!')
  }


  return sendJson(res, 404, 'Not Found')
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Server running at http://localhost:${address.port}/`)
})