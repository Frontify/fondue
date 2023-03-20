/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_STYLE } from '@utilities/focus';
import React from 'react';
import { Card } from './Card';

const CARD_ID = '[data-test-id=card]';

const CARD_CHILDREN = <div>child</div>;

describe('Card Component', () => {
    it('should render children correctly', () => {
        cy.mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).contains('child');
    });

    it('should call onClick', () => {
        const onClickStub = cy.stub();
        cy.mount(<Card onClick={onClickStub}>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).click();
        cy.get(CARD_ID).invoke('attr', 'tabIndex').should('equal', '0');
        cy.wrap(onClickStub).should('have.been.called');
    });

    it('should be accessible', () => {
        const onClickStub = cy.stub();
        cy.mount(<Card onClick={onClickStub}>{CARD_CHILDREN}</Card>);

        cy.window().focus();
        cy.get('body').realPress('Tab');
        cy.get(CARD_ID).should('have.class', FOCUS_STYLE);
        cy.get(CARD_ID).realPress('Enter');
        cy.wrap(onClickStub).should('have.been.called');
    });

    it('should not be focusable/tabbable if no onClick supplied', () => {
        cy.mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).invoke('attr', 'tabIndex').should('be.undefined');
    });
});
