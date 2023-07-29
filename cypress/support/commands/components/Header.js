import SearchResultPage from "../pages/SearchResultPage";
import ComparisonModal from "../pages/ComparisonModal";
import Catalog from "./Catalog";
import Basket from "./Basket";

class Header {
  catalogBtn() {
    return cy.get(".header-catalog");
  }

  basketBtn() {
    return cy.get("rz-cart");
  }

  comparisonBtn() {
    return cy.get("[aria-label='Списки порівнянь']");
  }

  searchInput() {
    return cy.get("[name='search']");
  }

  clickOnCatalogBtn() {
    this.catalogBtn().click();

    return new Catalog();
  }

  clickOnComparisonBtn() {
    this.comparisonBtn().click();

    return new ComparisonModal();
  }

  clickOnBasketBtn() {
    this.basketBtn().click();

    return new Basket();
  }

  search(keyword) {
    this.searchInput()
      .should("be.visible")
      .clear()
      .type(keyword + "{enter}");

    return new SearchResultPage();
  }
}
export default Header;
