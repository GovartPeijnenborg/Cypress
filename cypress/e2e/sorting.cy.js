// Common Shopify sort-by selectors
const SORT_SELECT = 'select[name="sort_by"], #SortBy, .collection-sort select, select.sort-by'
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
        cy.get(SORT_SELECT).select(PRICE_LOW_TO_HIGH)

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
