import HomePage from "./HomePage.js";

class State {
  site() {
    cy.visit(Cypress.env("URL"));
    cy.location("protocol").should("eq", "https:");

    return new HomePage();
  }
}
export default State;
