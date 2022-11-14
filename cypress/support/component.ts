/* (c) Copyright Frontify Ltd., all rights reserved. */

import './commands';

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
        }
    }
}

import 'cypress-real-events/support';
import '../../src/styles.css';
