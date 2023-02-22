/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { Button, ButtonRounding } from './Button';

const BUTTON_TEXT = 'Frontify';
const BUTTON_ID = '[data-test-id=button]';

describe('Button component', () => {
    it('renders text', () => {
        cy.mount(<Button>{BUTTON_TEXT}</Button>);

        cy.get(BUTTON_ID).should('be.visible');
        cy.get(BUTTON_ID).contains(BUTTON_TEXT);
    });

    it('renders with only an icon', () => {
        cy.mount(<Button icon={<IconIcon />} />);
        cy.get(BUTTON_ID).find('svg').should('be.visible');
    });

    it('renders with only an icon and fully rounded', () => {
        cy.mount(<Button icon={<IconIcon />} rounding={ButtonRounding.Full} />);
        cy.get(BUTTON_ID).find('svg').should('be.visible');
        cy.get(BUTTON_ID).should('have.class', 'tw-rounded-full');
    });

    it('renders with an icon and text', () => {
        cy.mount(<Button icon={<IconIcon />}>{BUTTON_TEXT}</Button>);

        cy.get(BUTTON_ID).should('be.visible');
        cy.get(BUTTON_ID).contains(BUTTON_TEXT);

        cy.get(BUTTON_ID).children('span').find('svg').should('be.visible');
        cy.get(BUTTON_ID).contains(BUTTON_TEXT);
    });

    it('reacts on click', () => {
        const onClickStub = cy.stub().as('onClickStub');

        cy.mount(<Button onClick={onClickStub}>{BUTTON_TEXT}</Button>);

        cy.get('@onClickStub').should('not.be.called');
        cy.get(BUTTON_ID).click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it('does not react on click when disabled', () => {
        cy.mount(<Button disabled>{BUTTON_TEXT}</Button>);
        cy.get(BUTTON_ID).invoke('attr', 'disabled').should('eq', 'disabled');
    });
});
