import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  return {
    async open() {
      await page.goto('/configure')
    },

    async selectColor(name: string) {
      await page.getByRole('button', { name }).click()
    },

    async selectWheels(name: string | RegExp) {
      await page.getByRole('button', { name }).click()
    },

    async toggleOptional(name: string | RegExp) {
      // Find the label containing the matching text, and click the nested radix UI checkbox
      await page.locator('label').filter({ hasText: name }).locator('button[role="checkbox"]').click()
    },

    async expectPrice(price: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      // In dev, Vite serves assets as /src/assets/....
      // In build/preview, assets are fingerprinted as /assets/<name>-<hash>.png.
      // Accept either by matching the image filename in the final URL.
      const fileName = src.split('/').pop() ?? src
      await expect(carImage).toHaveAttribute('src', new RegExp(`${fileName.replaceAll('.', '\\.')}$|${fileName.replaceAll('.', '\\.').replace(/\\.png$/, '')}-.*\\.png$`))
    },

    async checkout() {
      await page.getByRole('button', { name: /Monte o Seu/i }).click()
    },
  }
}
