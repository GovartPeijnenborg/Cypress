// Selector covering common Shopify theme product card link patterns
const PRODUCT_CARD_LINK = '.product-card a, .product-item a, .card--product a, li.grid__item a.card__link, li.grid__item .card a'
const PRODUCT_TITLE = 'h1, .product__title, .product-single__title'
const PRODUCT_PRICE = '.price, .product__price, [data-product-price], .price-item--regular'
const PRODUCT_IMAGE = '.product__media img, .product-single__photo img, .product__media-list img, [data-product-image] img'

describe('Product Detail Page', () => {
  beforeEach(() => {
    cy.bypassShopifyPassword()
    cy.visit('/collections/all')
  })

  it('opens the first product and shows title, price and at least one image', () => {
    // Click the first product card link
    cy.get(PRODUCT_CARD_LINK).first().click()

    // Title is visible
    cy.get(PRODUCT_TITLE).first().should('be.visible')

    // Price is visible
    cy.get(PRODUCT_PRICE).first().should('be.visible')

    // At least one product image is rendered
    cy.get(PRODUCT_IMAGE).should('have.length.greaterThan', 0)
  })
})
