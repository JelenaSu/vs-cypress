const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      validLoginEmail: "test1235@gmail.com",
      validLoginPassword: "test1235"
    },

    baseUrl: "https://cypress.vivifyscrum-stage.com/"
  },
});
