import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
  return {
    async expectOrderStatus(statusMessage: string | RegExp) {
      await expect(page).toHaveURL(/\/success/)
      await expect(page.getByRole('heading', { name: statusMessage })).toBeVisible()
    }
  }
}
