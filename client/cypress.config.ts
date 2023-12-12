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
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "./cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
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
      runMode: 3,
      openMode: 3,
    },
  },
});
