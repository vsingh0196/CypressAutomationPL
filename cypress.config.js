const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://pricelabs.co',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //baseUrl: 'https://pricelabs.co'
  },
});
