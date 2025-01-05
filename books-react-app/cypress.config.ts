import axios from 'axios';
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',

    setupNodeEvents(on, _config) {
      // implement node event listeners here
      on("task", {
        'seedDatabase': async () => {
          await axios.post(`http://localhost:7000/api/seed`);
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
