/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DialogHeader } from './DialogHeader';

const DIALOG_HEADER_SELECTOR = '[data-test-id=fondue-dialog-header]';

describe('DialogHeader Component', () => {
    it('should render foo text correctly', () => {
        cy.mount(<DialogHeader title="Hello" />);

        cy.get(DIALOG_HEADER_SELECTOR).should('exist');
    });
});
