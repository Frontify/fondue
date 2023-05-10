/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Textarea } from './Textarea';

const TEXTAREA_ID = '[data-test-id=textarea]';

describe('Textarea component', () => {
    it('renders TextareaField only', () => {
        cy.mount(<Textarea></Textarea>);
        cy.get(TEXTAREA_ID).should('not.have.attr', 'value');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'required');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'placeholder');
        cy.get(TEXTAREA_ID).should('not.have.attr', 'disabled');
    });
});
