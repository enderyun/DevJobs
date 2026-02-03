import { test, describe, before, after } from "node:test"
import assert from "node:assert"
import app from "./app.js"

let server
const PORT = 3001
const BASE_URL = `http://localhost:${PORT}`

// Se ejecuta una vez antes de levantar el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, resolve)
    server.on('error', reject)
  })
})

// Despues de todos los test, se ejecuta una vez para cerrar el servidor
after(async () => {
  return new Promise((resolve, reject) => {
    server.close(resolve)
    server.on('error', reject)
  })
})

describe('GET /jobs', () => {
  test('should return all jobs', async () => {
    const response = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(Array.isArray(json.data), 'Response data is not an array')
  })

  test('should return jobs with technology filter', async () => {
    const response = await fetch(`${BASE_URL}/jobs?technology=javascript`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(Array.isArray(json.data), 'Response data is not an array')
    assert.ok(json.data.every(job => job.data.technology.includes('javascript')), 'Not all jobs have technology filter')
  })
})