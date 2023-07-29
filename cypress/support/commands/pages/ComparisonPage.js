import Loading from "../components/Loading";

class ComparisonPage extends Loading {
  getProductName(number) {
    const index = Math.floor(Math.random() * 888);
    cy.get(".product__heading")
      .eq(number - 1)
      .invoke("text")
      .then(text => {
        cy.wrap(text.trim()).as("productName" + index);
      });

    return cy.get(`@productName${index}`);
  }
}

export default ComparisonPage;
