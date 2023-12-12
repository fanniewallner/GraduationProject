import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

/* Given("I open Google", () => {
  cy.visit("https://www.google.com/");
}); */

Given("I open Google", () => {
  cy.visit("https://www.google.com");
});

Then("I should see the Google logo", () => {
  cy.get('img[alt="Google"]').should("be.visible");
});
