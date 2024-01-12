/* import { apiResponse } from "../../fixtures/apiResponse";

cy.intercept(
  {
    method: "GET",
    url: "http://localhost:1337/api/products?populate=*",
  },
  apiResponse
).as("getProducts");
 */

import { Before } from "@badeball/cypress-cucumber-preprocessor";
import { apiContactResponse } from "../../fixtures/apiContactResponse";
import { apiResponse } from "../../fixtures/apiResponse";
Before(() => {
  cy.intercept(
    {
      method: "GET",

      url: "/api/products?populate=*",
    },
    apiResponse
  ).as("getProducts");
});

Before(() => {
  cy.intercept(
    {
      method: "GET",

      url: "/api/contact-detail",
    },
    apiContactResponse
  ).as("getContactInfo");
});
