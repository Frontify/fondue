/* (c) Copyright Frontify Ltd., all rights reserved. */

import './commands';

import { type mount } from 'cypress/react18';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Mounts a React node
             * @param component React Node to mount
             * @param options Additional options to pass into mount
             */
            mount(...parameters: Parameters<typeof mount>): ReturnType<typeof mount>;
        }
    }
}

import 'cypress-real-events/support';
import '../../src/styles.css';
