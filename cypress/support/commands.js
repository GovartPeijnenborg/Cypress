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
 * Visits the store homepage and bypasses the Shopify password protection page
 * if one is present. Safe to call at the start of every test — if no password
 * gate is found the command simply continues after the visit.
 *
 * Usage:
 *   beforeEach(() => { cy.bypassShopifyPassword() })
 */
Cypress.Commands.add('bypassShopifyPassword', () => {
  cy.visit('/')

  // Check for a password input without failing if it is absent
  cy.get('body').then(($body) => {
    const passwordSelector = 'input[type="password"], #password'
    if ($body.find(passwordSelector).length > 0) {
      cy.get(passwordSelector)
        .first()
        .type(Cypress.env('SHOPIFY_PASSWORD'), { log: false })

      // Submit via the form so it works regardless of button selector
      cy.get(passwordSelector).first().closest('form').submit()

      // Wait for the storefront to finish loading after the redirect
      cy.location('pathname').should('not.include', 'password')
      cy.get('body').should('be.visible')
    }
  })
})
