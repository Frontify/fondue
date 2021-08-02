/// <reference types="cypress" />

// There's an open issue to fix type support: https://github.com/Bkucera/cypress-plugin-tab/issues/40
// This is only a workaround until a new release will be published
declare namespace Cypress {
    interface Chainable {
        tab(options?: Partial<{ shift: boolean }>): Chainable;
    }
}
