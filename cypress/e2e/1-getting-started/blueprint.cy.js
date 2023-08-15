/// <reference types="cypress" />

describe("View Blueprints", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/blueprint-overview");
  });

  it("can setup the database", () => {
    // setup the database
    cy.visit("http://localhost:5173/admin-overview");
    cy.get('[data-test-id="reset_database_button"]').click();
  });

  it("displays three by default", () => {
    cy.get('[data-test-id="blueprint-list"]').within(() => {
      cy.get("div").should("have.length", 9);
    });
  });
});

describe("Manage Blueprint relationships", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/blueprint-overview");
  });

  const checkboxSelector = 'input[data-test-id="objective_build_persona"]';

  it("can create a new relationship", () => {
    // click on the financial performance blueprint
    // cy.get("financial_performance");
    cy.get('[data-test-id="blueprint_financial_performance_ai"]').click();
    // Save the checked state of the checkbox
    cy.get(checkboxSelector).should("not.be.checked");
    cy.get(checkboxSelector).check();
    cy.get('[data-test-id="save_button"]').click();

    // click on the financial performance blueprint
    cy.get('[data-test-id="blueprint_financial_performance_ai"]').click();
    cy.get(checkboxSelector).should("be.checked");
  });

  it("remove a existing relationship", () => {
    cy.get('[data-test-id="blueprint_financial_performance_ai"]').click();

    //
    cy.get(checkboxSelector).uncheck();
    cy.get('[data-test-id="save_button"]').click();

    // click on the financial performance blueprint
    cy.get('[data-test-id="blueprint_financial_performance_ai"]').click();
    cy.get(checkboxSelector).should("not.be.checked");
  });
});
