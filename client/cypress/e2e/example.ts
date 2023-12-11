import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open Google", () => {
  cy.visit("https://www.google.com/");
});

Then("I should see the Google logo", () => {
  cy.get('img[alt="Google"]').should("be.visible");
});
