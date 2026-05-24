describe('About Page', () => {
  beforeEach(() => {
    cy.bypassShopifyPassword()
    cy.visit('/pages/about')
  })

  it('contains the brand origin story excerpt', () => {
    cy.contains('From a small Antwerp grocery').should('be.visible')
  })
})
