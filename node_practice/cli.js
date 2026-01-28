import { readdir, stat } from "node:fs/promises"
import { join } from "node:path"


// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.'


// 2. Formateo simple de los tamaños
const formatByte = (size) => {
  if (size < 1024) return `${size} bytes`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
  return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

// 3. Leer los nombres sin info de la carpeta 
const files = await readdir(dir)
console.log(files)

// 4. Recuperar la info de cada file
const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)
    return {
      name,
      isDir: info.isDirectory(),
      size: formatByte(info.size)
    }
  })
)

for (const entry of entries) {
  // Renderizar la info
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : `${entry.size}`

  console.log(`${icon}  ${entry.name.padEnd(25)} ${size}`)
}