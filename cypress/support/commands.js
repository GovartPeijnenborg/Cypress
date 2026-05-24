// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Bypasses the Shopify storefront password gate.
 * Reads SHOPIFY_PASSWORD from Cypress.env() — set via cypress.env.json locally
 * or the SHOPIFY_PASSWORD GitHub Actions secret in CI.
 * Fails immediately with a clear message if the value is missing or empty,
 * preventing a confusing cy.type(undefined) error downstream.
 *
 * Usage:
 *   beforeEach(() => { cy.bypassShopifyPassword() })
 */
Cypress.Commands.add('bypassShopifyPassword', () => {
  const password = Cypress.env('SHOPIFY_PASSWORD')

  // Guard: fail fast with a readable message rather than a cryptic type() error
  expect(
    password,
    'SHOPIFY_PASSWORD must be set — add it to cypress.env.json locally or the SHOPIFY_PASSWORD GitHub Actions secret in CI'
  ).to.be.a('string').and.not.be.empty

  cy.visit('/password')

  cy.get('input[type="password"], input[name="password"]')
    .first()
    .should('be.visible')
    .clear()
    .type(password, { log: false })

  cy.get('form').first().submit()

  // Wait for the storefront to finish loading after the redirect
  cy.location('pathname').should('not.include', 'password')
  cy.get('body').should('be.visible')
})
