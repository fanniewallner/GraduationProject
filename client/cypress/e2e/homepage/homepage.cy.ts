import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the home page", () => {
  cy.wait("@getContactDetailsInfo");
});

Then("I can see a logo", () => {
  cy.get('[data-cy="logo"]').should("exist");
});

Then("I can click a call-to-action button", () => {
  cy.wait("@getProducts");
  cy.get('[data-cy="actionButton"]').click();
});
