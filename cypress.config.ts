import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Reemplaza con la URL donde se sirve tu aplicación Angular
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
