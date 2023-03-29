/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InlineDialog } from './InlineDialog';

const InlineDialog_SELECTOR = '[data-test-id=fondue-inlineDialog]';

describe('InlineDialog Component', () => {
    it('should render', () => {
        cy.mount(
            <InlineDialog>
                <p>Hello!</p>
            </InlineDialog>,
        );

        cy.get(InlineDialog_SELECTOR).should('exist');
    });
});
