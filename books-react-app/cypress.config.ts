import axios from 'axios';
import { defineConfig } from "cypress";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: `./env/.env.${process.env.CYPRESS_ENV}` });

export default defineConfig({
  e2e: {
    baseUrl: process.env.HOST,
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',

    setupNodeEvents(on, _config) {
      // implement node event listeners here
      on("task", {
        'seedDatabase': async () => {
          await axios.post(`${process.env.VITE_API_URL}/api/seed`);
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
