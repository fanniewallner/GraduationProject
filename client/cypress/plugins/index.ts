import cucumber from "cypress-cucumber-preprocessor";

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  on("file:preprocessor", cucumber());
  return config;
};
