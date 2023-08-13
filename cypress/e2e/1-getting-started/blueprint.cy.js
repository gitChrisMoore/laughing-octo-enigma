/// <reference types="cypress" />

describe("Blueprints", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/blueprint-overview");
  });

  it("displays three by default", () => {
    cy.get('[data-test-id="blueprint-list"]').within(() => {
      cy.get("div").should("have.length", 3);
    });
  });

  describe("views details of an item of a list", () => {
    beforeEach(() => {
      cy.contains("financial_performance").click();
    });

    it("should have the correct name field", () => {
      cy.get('[data-test-id="blueprint_name"]').should(
        "have.text",
        "financial_performance_ai"
      );
    });

    it("should have the correct description field", () => {
      cy.get('[data-test-id="blueprint_description"]').should(
        "have.text",
        "Analyzes financial performance, providing the CEO with a clear picture of the company’s financial health."
      );
    });

    it("should have XX list of objectives", () => {
      cy.get('[data-test-id="objective_list"]').within(() => {
        cy.get("div").should("have.length", 15);
      });
    });
  });
  describe("save a new objective relationship", () => {
    beforeEach(() => {
      cy.contains("financial_performance").click();
    });

    it("save the updated relationship", () => {
      cy.contains("BUILD_PERSONA").click();
      cy.get('[data-test-id="save_button"]').click();
    });
  });
});
