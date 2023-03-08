/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Dialog } from './Dialog';

const Dialog_SELECTOR = '[data-test-id=fondue-dialog]';

describe('Dialog Component', () => {
    it('should render', () => {
        cy.mount(
            <Dialog>
                <p>Hello!</p>
            </Dialog>,
        );

        cy.get(Dialog_SELECTOR).should('exist');
    });
});
