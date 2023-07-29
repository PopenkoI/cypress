import Loading from "./Loading";

class Basket extends Loading {
  deleteProductBtn() {
    return cy.get("rz-trash-icon button");
  }

  getProductName(number) {
    const index = Math.floor(Math.random() * 888);
    cy.get(".cart-product__title")
      .eq(number - 1)
      .invoke("text")
      .then(text => {
        cy.wrap(text.trim()).as("productName" + index);
      });

    return cy.get(`@productName${index}`);
  }

  getProductPrice(number) {
    const index = Math.floor(Math.random() * 888);
    cy.get(".cart-product__price--red")
      .eq(number - 1)
      .invoke("text")
      .then(text => {
        cy.wrap(text.replace(/\s/g, "")).as("productPrice" + index);
      });

    return cy.get(`@productPrice${index}`);
  }

  getTotalPrice() {
    const index = Math.floor(Math.random() * 888);
    cy.get(".cart-receipt__sum-price")
      .invoke("text")
      .then(text => {
        cy.wrap(text.replace(/\s/g, "")).as("totalPrice" + index);
      });

    return cy.get(`@totalPrice${index}`);
  }

  clickOnActionsBtn(number) {
    cy.get("rz-popup-menu button")
      .should("be.visible")
      .eq(number - 1)
      .click();

    return this;
  }

  verifyDeleteProductBtn() {
    this.deleteProductBtn().should("be.visible").should("be.enabled");

    return this;
  }
}
export default Basket;
