import { defineConfig } from "cypress";
import { seed } from "../books-node-api/src/utils/testSeed";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      PORT: 7000,
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    setupNodeEvents(on, _config) {
      // implement node event listeners here
      on("task", {
        async seedDatabase() {
          await seed();
          return null;
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
