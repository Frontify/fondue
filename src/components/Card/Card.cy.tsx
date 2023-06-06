/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_STYLE } from '@utilities/focusStyle';
import React from 'react';
import { Card } from './Card';

const CARD_ID = '[data-test-id=card]';

const CARD_CHILDREN = <div>child</div>;

describe('Card Component', () => {
    it('should render children correctly', () => {
        cy.mount(<Card>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).contains('child');
    });

    it('should render with correct tokens if hovered and hoverable is true', () => {
        cy.mount(<Card hoverable={true}>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).realHover();

        cy.get(CARD_ID)
            .should('have.class', 'hover:tw-border-line-xx-strong')
            .should('have.class', 'tw-cursor-default');
    });

    it('should call onClick', () => {
        const onClickStub = cy.stub();
        cy.mount(<Card onClick={onClickStub}>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).click();
        cy.get(CARD_ID).invoke('attr', 'tabIndex').should('equal', '0');
        cy.wrap(onClickStub).should('have.been.called');
    });

    it('should render with correct cursor if onClick is defined and card is hovered', () => {
        cy.mount(
            <Card
                onClick={() => {
                    console.log('clicked');
                }}
            >
                {CARD_CHILDREN}
            </Card>,
        );

        cy.get(CARD_ID).realHover();

        cy.get(CARD_ID).should('have.class', 'tw-cursor-pointer');
    });

    it('should render with correct tokens if hoverable is true and card is tabbed into', () => {
        cy.mount(<Card hoverable={true}>{CARD_CHILDREN}</Card>);

        cy.get(CARD_ID).realPress('Tab');

        cy.get(CARD_ID).should('have.class', 'tw-border-line-xx-strong');
        cy.get(CARD_ID).should('have.class', 'tw-ring-blue');
        cy.get(CARD_ID).should('have.class', 'tw-ring-4');
    });

    it('should render with correct tokens if card is active and onClick is defined', () => {
        cy.mount(
            <Card
                onClick={() => {
                    console.log('clicked');
                }}
            >
                {CARD_CHILDREN}
            </Card>,
        );

        cy.get(CARD_ID).realMouseDown();

        cy.get(CARD_ID)
            .should('have.class', 'active:tw-border-line-xx-strong')
            .should('have.class', 'active:tw-border-2');
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
