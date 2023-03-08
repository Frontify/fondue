/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { DialogBody } from './DialogBody';

const DialogBody_SELECTOR = '[data-test-id=fondue-dialog-body]';

describe('DialogBody Component', () => {
    it('should render', () => {
        cy.mount(<DialogBody>Hello!</DialogBody>);

        cy.get(DialogBody_SELECTOR).should('exist');
    });
});
