/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Textarea } from './Textarea';

const TEXTAREA_ID = '[data-test-id=textarea]';
const EXCLAMATION_MARK_ICON_ID = '[data-test-id=error-state-exclamation-mark-icon]';

describe('Textarea component', () => {
    it('renders', () => {
        cy.mount(<Textarea></Textarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
        cy.get(TEXTAREA_ID).find('[data-test-id="decorator"]').should('have.length', 0);
        cy.get(TEXTAREA_ID).find(EXCLAMATION_MARK_ICON_ID).should('have.length', 0);
    });
});
