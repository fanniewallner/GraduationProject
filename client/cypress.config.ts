import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { devServer } from "@cypress/vite-dev-server";
import react from "@vitejs/plugin-react-swc";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { createRollupPlugin } from "@badeball/cypress-cucumber-preprocessor/rollup";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import cypressCucumberPkg from "@badeball/cypress-cucumber-preprocessor";

const { addCucumberPreprocessorPlugin } = cypressCucumberPkg;

export default defineConfig({
  video: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "./cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    experimentalRunAllSpecs: true,
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    retries: {
      runMode: 3, // Configure retry attempts for cypress run, default is 0
      openMode: 0, // Configure retry attempts for cypress open, default is 0
    },
  },
  component: {
    specPattern: "./cypress/component/**/*.feature",
    supportFile: "./cypress/support/component.ts",
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: "react",
        viteConfig: {
          plugins: [
            react(),
            createRollupPlugin(devServerConfig.cypressConfig),
            viteCommonjs(),
          ],
        },
      });
    },
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
      await addCucumberPreprocessorPlugin(on, config);
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
