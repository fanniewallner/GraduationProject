import {
  Given,
  Then,
  defineParameterType,
} from "@badeball/cypress-cucumber-preprocessor";
defineParameterType({
  name: "email",
  regexp: /("[^"]+"|'[^']+')/,
  transformer: (email) => email.slice(1, -1),
});

Given("I visit the home page", () => {
  cy.visit("/");
});

Then("I can see a logo", () => {
  cy.get('[data-cy="logo"]').should("exist");
});

Then("I can see a footer containing the email {email}", (email: string) => {
  cy.get('[data-cy="footer-email"]').should("contain", `${email}`);
});
Then("I can click a call-to-action button", () => {
  cy.wait("@getProducts");
  cy.get('[data-cy="actionButton"]').click();
});

Then("I should be navigated to the product page", () => {
  cy.url().should("contain", "/produktkatalog");
});
