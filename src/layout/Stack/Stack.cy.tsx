/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Stack } from './Stack';

describe('Stack Layout', () => {
    it('should render a row layout', () => {
        cy.mount(
            <Stack padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get('[data-test-id=stack]').as('Stack');
        cy.get('@Stack').should('have.class', 'tw-flex-row');
    });

    it('should render a column layout', () => {
        cy.mount(
            <Stack direction="column" padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get('[data-test-id=stack]').as('Stack');
        cy.get('@Stack').should('have.class', 'tw-flex-col');
    });

    it('should render a spacing in a stack', () => {
        cy.mount(
            <Stack padding="m" spacing="m">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get('[data-test-id=stack]').as('Stack');
        cy.get('@Stack').should('have.class', 'tw-p-m');
        cy.get('@Stack').should('have.class', 'tw-gap-m');
    });

    it('should render alignment in a stack', () => {
        cy.mount(
            <Stack align="start" justify="between" padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </Stack>,
        );

        cy.get('[data-test-id=stack]').as('Stack');
        cy.get('@Stack').should('have.class', 'tw-justify-between');
        cy.get('@Stack').should('have.class', 'tw-items-start');
    });
});
