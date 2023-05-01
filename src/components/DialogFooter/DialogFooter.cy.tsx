/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DialogFooter } from './DialogFooter';

const DIALOG_FOOTER_SELECTOR = '[data-test-id=fondue-dialog-footer]';

describe('DialogHeader Component', () => {
    it('should render', () => {
        cy.mount(<DialogFooter buttons={[{ children: 'Confirm', onClick: () => console.log('confirm') }]} />);

        cy.get(DIALOG_FOOTER_SELECTOR).should('exist');
    });
});
