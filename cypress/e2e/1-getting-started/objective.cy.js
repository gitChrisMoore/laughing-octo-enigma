/// <reference types="cypress" />

describe("View Objectives", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/objective-overview");
  });

  it("can setup the database", () => {
    // setup the database
    cy.visit("http://localhost:5173/admin-overview");
    cy.get('[data-test-id="reset_database_button"]').click();
  });

  it("displays five objectives by default", () => {
    cy.get('[data-test-id="objective-list"]').within(() => {
      cy.get("div").should("have.length", 5); // replace 5 with the expected number of objectives
    });
  });
});

describe("View Objective Details", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/objective-overview");
  });

  it("displays the details of a objective", () => {
    cy.contains("build_persona").click();
    // check for the field with data-test-id "parameters.0.name" to have the word "age" in it

    cy.get('[data-test-id="parameters.0.name"]')
      .invoke("val")
      .then((val) => {
        expect(val).to.include("age");
      });
  });
});
