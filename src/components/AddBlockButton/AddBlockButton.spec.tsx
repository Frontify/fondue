/* (c) Copyright Frontify Ltd., all rights reserved. */
import { mount } from 'cypress/react';
import React from 'react';
import { AddBlockButton } from './AddBlockButton';

const BUTTON_ID = '[data-test-id=add-block-button]';

describe('Add Block Button component', () => {
    it('reacts on click', () => {
        const onClickStub = cy.stub().as('onClickStub');

        mount(<AddBlockButton onClick={onClickStub} />);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(BUTTON_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });
});
