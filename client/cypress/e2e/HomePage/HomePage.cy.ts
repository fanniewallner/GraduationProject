import { When, Then } from "cypress-cucumber-preprocessor/steps";

When("I visit the home page", () => {
  cy.visit("/");
});
