/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { LegacyStack } from './LegacyStack';

describe('LegacyStack Layout', () => {
    it('should render a row layout', () => {
        cy.mount(
            <LegacyStack padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </LegacyStack>,
        );

        cy.get('[data-test-id=fondue-legacy-stack]').as('LegacyStack');
        cy.get('@LegacyStack').should('have.class', 'tw-flex-row');
    });

    it('should render a column layout', () => {
        cy.mount(
            <LegacyStack direction="column" padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </LegacyStack>,
        );

        cy.get('[data-test-id=fondue-legacy-stack]').as('LegacyStack');
        cy.get('@LegacyStack').should('have.class', 'tw-flex-col');
    });

    it('should render a spacing in a stack', () => {
        cy.mount(
            <LegacyStack padding="m" spacing="m">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </LegacyStack>,
        );

        cy.get('[data-test-id=fondue-legacy-stack]').as('LegacyStack');
        cy.get('@LegacyStack').should('have.class', 'tw-p-m');
        cy.get('@LegacyStack').should('have.class', 'tw-gap-m');
    });

    it('should render alignment in a stack', () => {
        cy.mount(
            <LegacyStack align="start" justify="between" padding="none" spacing="none">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </LegacyStack>,
        );

        cy.get('[data-test-id=fondue-legacy-stack]').as('LegacyStack');
        cy.get('@LegacyStack').should('have.class', 'tw-justify-between');
        cy.get('@LegacyStack').should('have.class', 'tw-items-start');
    });
});
