import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the home page", () => {
  cy.visit("/");
});

Then("I can see a logo", () => {
  cy.get('[data-cy="logo"]').should("exist");
});

Then("I can click a call-to-action button", () => {
  cy.wait("@getProducts");
  cy.get('[data-cy="actionButton"]').click();
});

Then("I see a footer containing the email {string}", (string: string) => {
  cy.wait("@getContactInfo");
  cy.get('[data-cy="footer]').contains(string);
});

Then("I see a carousel containing the product {string}", (string: string) => {
  cy.wait("@getContactInfo");
  cy.get('[data-cy="carousel]');
});
