class Loading {
  getPreloader() {
    return cy.get(".preloader");
  }

  getSuccessNotification() {
    return cy.get(".notification__wrapper.notification__wrapper--success");
  }

  getModalLockedElement() {
    return cy.get(".modal__content--locked");
  }

  verifyPreloaderAppearsAndDisappears() {
    this.verifyPreloaderIsVisible().verifyPreloaderIsNotVisible();

    return this;
  }

  verifyPreloaderIsNotVisible() {
    this.getPreloader().should("not.be.visible");

    return this;
  }

  verifyModalLockedElementDoesNotExist() {
    this.getModalLockedElement().should("not.exist");

    return this;
  }

  verifyPreloaderIsVisible() {
    this.getPreloader().should("be.visible");

    return this;
  }

  verifySuccessNotificationAppearsAndDisappears() {
    this.getSuccessNotification().should("be.visible");
    this.getSuccessNotification().should("not.exist");

    return this;
  }
}
export default Loading;
