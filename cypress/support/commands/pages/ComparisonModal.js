import Loading from "../components/Loading";
import ComparisonPage from "./ComparisonPage";

class ComparisonModal extends Loading {
  chooseListOfComparisons() {
    cy.get(".comparison-modal__link").should("be.visible").click();

    return new ComparisonPage();
  }
}

export default ComparisonModal;
