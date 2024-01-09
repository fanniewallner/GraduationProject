import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the product page", () => {
  cy.visit("/produktkatalog");
});

Then("I can see a button for sorting products on work benches", () => {
  cy.get("sortByCategory1").should("exist");
});
