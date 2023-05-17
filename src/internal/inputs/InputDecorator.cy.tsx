/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InputDecorator } from './InputDecorator';
import { IconIcon16 } from '@foundation/Icon/Generated';

const INPUT_DECORATOR_ID = '[data-test-id="decorator"]';

describe('InputDecorator', () => {
    it('renders the decorator element', () => {
        cy.mount(<InputDecorator element={<IconIcon16 />} />);
        cy.get(INPUT_DECORATOR_ID).should('exist');
        cy.get(INPUT_DECORATOR_ID).should('have.class', 'tw-text-text');
    });

    it('renders empty component if no decorator element', () => {
        cy.mount(<InputDecorator element={null} />);
        cy.get(INPUT_DECORATOR_ID).should('not.exist');
    });

    it('renders the disabled state', () => {
        cy.mount(<InputDecorator element={<IconIcon16 />} disabled />);
        cy.get(INPUT_DECORATOR_ID).should('have.class', 'tw-text-text-disabled');
    });
});
