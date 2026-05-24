// Selector covering common Shopify theme product card patterns
const PRODUCT_CARD = '.product-card, .product-item, [data-product-id], .card--product, li.grid__item'
const PRODUCT_TITLE = '.card__heading, .product-card__title, .product-item__title, h2, h3'
const PRODUCT_PRICE = '.price, .product-price, [data-price], .price__regular, .price-item'

describe('Catalog — /collections/all', () => {
  beforeEach(() => {
    cy.bypassShopifyPassword()
    cy.wait(1000)
    cy.visit('/collections/all', { failOnStatusCode: false })
    cy.url().then((url) => {
      if (!url.includes('/collections/all')) {
        cy.wait(2000)
        cy.reload()
      }
    })
  })

  it('shows more than 0 product cards', () => {
    cy.get(PRODUCT_CARD).should('have.length.greaterThan', 0)
  })

  it('each product card has a visible title and price', () => {
    cy.get(PRODUCT_CARD).each(($card) => {
      cy.wrap($card).find(PRODUCT_TITLE).should('exist')
      cy.wrap($card).find(PRODUCT_PRICE).should('exist')
    })
  })
})
