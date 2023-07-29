import Filter from "../components/Filter";
import Loading from "../components/Loading";

class SearchResultPage extends Loading {
  filter = new Filter();

  getFilter() {
    return this.filter;
  }

  getProductsNameLabel() {
    return cy.get(".goods-tile__title");
  }

  verifyProductsNamesInTable(expectedWord) {
    this.getProductsNameLabel()
      .then($names => {
        return Cypress._.map($names, "innerText");
      })
      .each($productName => {
        expect($productName.replaceAll(" ", "")).to.contains(
          expectedWord.replaceAll(" ", "")
        );
      });

    return this;
  }

  getProductName(number) {
    const index = Math.floor(Math.random() * 888);
    this.getProductsNameLabel()
      .eq(number - 1)
      .invoke("text")
      .then(text => {
        cy.wrap(text).as("productName" + index);
      });

    return cy.get(`@productName${index}`);
  }

  getProductPrice(number) {
    const index = Math.floor(Math.random() * 888);
    cy.get(".goods-tile__price-value")
      .eq(number - 1)
      .invoke("text")
      .then(text => {
        cy.wrap(text.replace(/\s/g, "")).as("productPrice" + index);
      });

    return cy.get(`@productPrice${index}`);
  }

  addProductToBasket(index) {
    cy.get('[aria-label="Купити"]')
      .eq(index - 1)
      .click();

    return this;
  }

  addProductToComparison(index) {
    cy.get(".compare-button")
      .eq(index - 1)
      .click();

    return this;
  }
}

export default SearchResultPage;
