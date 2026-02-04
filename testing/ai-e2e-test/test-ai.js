// Esto es un ejemplo de como usar stagehand con algun modelo donde
// tengamos la API Key de alguna IA. Podria usarse Ollama para esto,
// pero debido al rendimiento de mi equipo, probablemente no lo use, pero
// tendria que probarlo; por ahora no lo he hecho.

// Los tokens de Google gratuitos van bastante bien, asi que lo he dejado
// con ese modelo. Por supuesto, se puede usar cualquiera que se desee sin
// inconvenientes.

// Seria interesante usarla para ciertos casos. Tal vez haga un mix entre playwright y stagehand.

import { test } from "node:test";
import assert from "node:assert";

process.loadEnvFile()

import { Stagehand } from "@browserbasehq/stagehand";

test('buscar empleos y aplicar a una oferta', async () => {
  const stagehand = new Stagehand({
    env: 'LOCAL',
    model: 'google/gemini-2.5-flash'
  });

  await stagehand.init()

  const [page] = stagehand.context.pages()

  await page.goto('http://localhost:5173')

  await stagehand.act('Escribir "React" en el campo de búsqueda')

  await stagehand.act('Hacer click en el botón "Buscar"')

  await stagehand.act('Hacer click en el botón "Iniciar sesión"')

  await stagehand.act('Hacer click en el botón "Aplicar" de la primera oferta')

  const { extraction } = await stagehand.extract('Debe de salir "Aplicado" en el botón de la primera oferta')
  // console.log("Texto del botón:", buttonText)
  assert.strictEqual(extraction, 'Aplicado')

  await stagehand.close()
})