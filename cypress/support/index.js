// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// cypress-plugin-tab is used to test accessibility via tabbing: https://github.com/Bkucera/cypress-plugin-tab
// Can be removed as soon as cypress supports cy.tab() functionality: https://github.com/cypress-io/cypress/issues/299
import "cypress-plugin-tab";
import "./commands";
import "../../dist/index.css";
