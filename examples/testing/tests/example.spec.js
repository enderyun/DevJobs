// @ts-check
import { test, expect } from '@playwright/test';


// Lo mas recomendable es usar:
// 1. Roles y Aria
// 2. Etiquetas de texto, placeholders, nombre
// 3. data-testid
// 4. Selectores de CSS como ultimo recurso


test('buscar empleos y aplicar a una oferta', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const jobCards = page.locator('.job-listing-card')

  await expect(jobCards.first()).toBeVisible()

  const firstJobTitle = jobCards.first().getByRole('heading', { level: 3 })

  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await applyButton.click()

  await page.getByRole('button', { name: 'Aplicado' }).first()


});
