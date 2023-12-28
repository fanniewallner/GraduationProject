import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the home page", () => {
  cy.visit("/");
});

Then("I can see a logo", () => {
  cy.get('[data-cy="logo"]').should("exist");
});
Then("I can click a call-to-action button", () => {
  cy.get('[data-cy="actionButton"]').click();
});
