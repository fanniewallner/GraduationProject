import { defineConfig } from "cypress";
import cucumber from "cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "./cypress/e2e/**/**.{feature,ts}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      runMode: 3,
      openMode: 3,
    },
  },
});
