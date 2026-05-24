// Common Shopify sort-by selectors
const SORT_SELECT = 'select[id*="SortBy"]'
const PRODUCT_TITLE = '.card__heading, .product-card__title, .product-item__title, h2, h3'
const PRICE_LOW_TO_HIGH = 'price-ascending'

describe('Sorting — /collections/all', () => {
  beforeEach(() => {
    cy.bypassShopifyPassword()
    cy.visit('/collections/all')
  })

  it('reorders products when sorted by price low to high', () => {
    // Capture titles before sorting
    const titlesBefore = []
    cy.get(PRODUCT_TITLE)
      .each(($el) => { titlesBefore.push($el.text().trim()) })
      .then(() => {
        cy.get(SORT_SELECT).first().select(PRICE_LOW_TO_HIGH)
        cy.wait(1500)

        // Wait for the page to re-render with the new sort order
        cy.url().should('include', 'sort_by=price-ascending')

        const titlesAfter = []
        cy.get(PRODUCT_TITLE)
          .each(($el) => { titlesAfter.push($el.text().trim()) })
          .then(() => {
            // The sorted order should differ from the default order
            expect(titlesAfter).to.not.deep.equal(titlesBefore)
          })
      })
  })
})
