import process from "node:process"
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"


let content = ''

if (process.permission.has('fs.read', 'archivo.txt')) {
    content = await readFile("archivo.txt", "utf-8")
    console.log(content)
} else {
    console.log("No tienes permiso para leer el archivo")
}

if (process.permission.has('fs.write', 'output')) {
    const outputDir = join('output')
    await mkdir(outputDir, { recursive: true })

    const upperCaseContent = content.toUpperCase()
    const outputFilePath = join(outputDir, 'archivo-uppercase.txt')

    await writeFile(outputFilePath, upperCaseContent)
    console.log("Archivo modificado con mayúsculas: ", upperCaseContent)
} else {
    console.log("No tienes permiso para escribir el archivo")
}
