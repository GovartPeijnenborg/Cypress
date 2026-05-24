const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "5pihta",
  e2e: {
    baseUrl: "https://r1057927-realbeans.myshopify.com",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    waitForAnimations: true,
    experimentalRunAllSpecs: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
