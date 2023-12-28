import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiResponse } from "../../fixtures/apiResponse";
Given("I visit the home page", () => {
  cy.visit("/");
});

Then("I can see a logo", () => {
  cy.get('[data-cy="logo"]').should("exist");
});

Then("I can click a call-to-action button", () => {
  cy.intercept(
    {
      method: "GET",

      url: "/api/products?populate=*",
    },
    apiResponse
  ).as("getProducts");

  cy.wait("@getProducts");
  cy.get('[data-cy="actionButton"]').click();
});
