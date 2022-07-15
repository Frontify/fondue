// ***********************************************************
// This example support/component.ts is processed and
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

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
import { MountOptions, MountReturn } from 'cypress/react';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Mounts a React node
             * @param component React Node to mount
             * @param options Additional options to pass into mount
             */
            mount(component: React.ReactNode, options?: MountOptions): Cypress.Chainable<MountReturn>;
            typeTab(component: React.ReactNode, options?: MountOptions): Cypress.Chainable<MountReturn>;
        }
    }
}

//alternative way to use mount within the files. Instead to import it, we can now write cy.mount(<Component/>)
Cypress.Commands.add('mount', (component, options) => {
    return cy.mount(component, options);
});

import 'cypress-real-events/support';
import '../../src/styles.css';
