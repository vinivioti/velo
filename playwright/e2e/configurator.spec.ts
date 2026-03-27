import { expect } from '@playwright/test'
import { test } from '../support/fixtures'

test.describe('Configuração do Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
    await app.configurator.expectPrice('R$ 40.000,00')

    await app.configurator.selectColor('Midnight Black')
    await app.configurator.expectPrice('R$ 40.000,00')
    await app.configurator.expectCarImageSrc('midnight-black-aero-wheels.png')
  })

  test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ app }) => {
    await app.configurator.expectPrice('R$ 40.000,00')

    await app.configurator.selectWheels(/Sport Wheels/)
    await app.configurator.expectPrice('R$ 42.000,00')
    await app.configurator.expectCarImageSrc('glacier-blue-sport-wheels.png')

    await app.configurator.selectWheels(/Aero Wheels/)
    await app.configurator.expectPrice('R$ 40.000,00')
    await app.configurator.expectCarImageSrc('glacier-blue-aero-wheels.png')
  })

  test('deve atualizar o preço dinamicamente ao adicionar ou remover opcionais, e persistir para o checkout', async ({ app, page }) => {
    // Preço inicial sem opcionais
    await app.configurator.expectPrice('R$ 40.000,00')
    
    // Marcar "Precision Park"
    await app.configurator.toggleOptional('Precision Park')
    await app.configurator.expectPrice('R$ 45.500,00')

    // Marcar "Flux Capacitor"
    await app.configurator.toggleOptional('Flux Capacitor')
    await app.configurator.expectPrice('R$ 50.500,00')

    // Desmarcar os opcionais para voltar ao estado inicial
    await app.configurator.toggleOptional('Precision Park')
    await app.configurator.toggleOptional('Flux Capacitor')
    await app.configurator.expectPrice('R$ 40.000,00')

    // Clicar em Checkout e confirmar o redirecionamento
    await app.configurator.checkout()
    await expect(page).toHaveURL(/.*\/order/)
  })
})