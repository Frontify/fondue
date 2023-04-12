/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ACCORDION_HEADER_ICON_ID, AccordionHeaderIcon } from './AccordionHeaderIcon';

const ACCORDION_HEADER_ICON_TEST_ID = `[data-test-id="${ACCORDION_HEADER_ICON_ID}"]`;

const LARGE_ACCORDION_ICON_WIDTH = 20;
const MEDIUM_ACCORDION_ICON_WIDTH = 16;
const SMALL_ACCORDION_ICON_WIDTH = 12;

describe('AccordionHeaderIcon Component', () => {
    it('should render rotated caret icon if isOpen is true', () => {
        cy.mount(<AccordionHeaderIcon isOpen />);
        cy.get(ACCORDION_HEADER_ICON_TEST_ID).should('have.class', 'tw-rotate-180');
    });

    it('should render normal caret icon if isOpen is false', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} />);
        cy.get(ACCORDION_HEADER_ICON_TEST_ID).should('not.have.class', 'tw-rotate-180');
    });

    it('should render with small icon', () => {
        cy.mount(<AccordionHeaderIcon isOpen size="small" />);

        cy.get(ACCORDION_HEADER_ICON_TEST_ID).find('svg').invoke('width').should('equal', SMALL_ACCORDION_ICON_WIDTH);
    });

    it('should render with medium icon', () => {
        cy.mount(<AccordionHeaderIcon isOpen size="medium" />);

        cy.get(ACCORDION_HEADER_ICON_TEST_ID).find('svg').invoke('width').should('equal', MEDIUM_ACCORDION_ICON_WIDTH);
    });

    it('should render with large icon', () => {
        cy.mount(<AccordionHeaderIcon isOpen size="large" />);

        cy.get(ACCORDION_HEADER_ICON_TEST_ID).find('svg').invoke('width').should('equal', LARGE_ACCORDION_ICON_WIDTH);
    });

    it('should use a custom data-test-id', () => {
        cy.mount(<AccordionHeaderIcon isOpen data-test-id="custom-data-test-id" />);
        cy.get('[data-test-id=custom-data-test-id]').should('exist');
    });
});
