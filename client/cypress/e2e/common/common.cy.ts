import { apiContactResponse } from "../../fixtures/apiContactResponse";
import { apiResponse } from "../../fixtures/apiResponse";

before(() => {
  cy.intercept(
    {
      method: "GET",

      url: "/api/products?populate=*",
    },
    apiResponse
  ).as("getProducts");
});

before(() => {
  cy.intercept(
    {
      method: "GET",

      url: "/api/contact-detail",
    },
    apiContactResponse
  ).as("getContactInfo");
});
