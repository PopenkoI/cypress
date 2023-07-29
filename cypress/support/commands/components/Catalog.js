import CategoryPage from "../pages/CategoryPage.js";

class Catalog {
  clickOnCategory(categoryName) {
    cy.contains("a", categoryName).click();

    return new CategoryPage();
  }
}
export default Catalog;
