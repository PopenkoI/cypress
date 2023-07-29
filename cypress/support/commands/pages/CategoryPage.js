import Loading from "../components/Loading";

class CategoryPage extends Loading {
  subcategory(name) {
    return cy.get(`[title="${name}"]`).first();
  }

  clickOnSubcategory(name) {
    this.subcategory(name).click();

    return this;
  }
}

export default CategoryPage;
