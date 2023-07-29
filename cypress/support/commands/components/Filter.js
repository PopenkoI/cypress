import SearchResultPage from "../pages/SearchResultPage";

class Filter {
  filterItem(name) {
    return cy.get(`[data-id='${name}']`);
  }

  selectFilterItem(name) {
    cy.wait(1000);
    this.filterItem(name).should("be.visible").click();

    return new SearchResultPage();
  }
}
export default Filter;
