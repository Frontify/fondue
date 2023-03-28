/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ACCORDION_HEADER_TEST_ID, AccordionHeader } from './AccordionHeader';
import { IconIcon12 } from '@foundation/Icon/Generated';

const HEADER_ID = `[data-test-id="${ACCORDION_HEADER_TEST_ID}"]`;
const HEADER_CONTAINER_ID = `[data-test-id="${ACCORDION_HEADER_TEST_ID}-container"]`;
const HEADER_TEXT_ID = `[data-test-id="${ACCORDION_HEADER_TEST_ID}-text"]`;
const HEADER_ICON_CONTAINER_ID = `[data-test-id="${ACCORDION_HEADER_TEST_ID}-icon-container"]`;
const HEADER_DECORATOR_ID = `[data-test-id="${ACCORDION_HEADER_TEST_ID}-decorator"]`;

const MEDIUM_ACCORDION_ICON_WIDTH = 16;

describe('AccordionHeader Component', () => {
    it('should have dark gray text if isOpen is false', () => {
        cy.mount(<AccordionHeader isOpen={false}>Title</AccordionHeader>);
        cy.get(HEADER_CONTAINER_ID).should('have.class', 'tw-text-black-80');
    });

    it('should have black text if isOpen is true', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);
        cy.get(HEADER_CONTAINER_ID).should('have.class', 'tw-text-black');
    });

    it('should render children', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);
        cy.get(HEADER_ID).should(($input) => {
            expect($input).to.contain('Title');
        });
        cy.get(HEADER_TEXT_ID).should('have.class', 'tw-font-normal');
    });

    it('should have light gray text when disabled', () => {
        cy.mount(
            <AccordionHeader isOpen disabled={true}>
                Title
            </AccordionHeader>,
        );

        cy.get(HEADER_CONTAINER_ID).should('have.class', 'tw-text-black-40');
    });

    it('should render with medium accordion icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', MEDIUM_ACCORDION_ICON_WIDTH);
    });

    it('should render with a decorator', () => {
        cy.mount(
            <AccordionHeader isOpen decorator={<IconIcon12 />}>
                Title
            </AccordionHeader>,
        );

        cy.get(HEADER_DECORATOR_ID).should('exist');
    });

    it('should use a custom data-test-id', () => {
        cy.mount(
            <AccordionHeader isOpen data-test-id="custom-data-test-id">
                Title
            </AccordionHeader>,
        );
        cy.get('[data-test-id=custom-data-test-id]').should('exist');
    });
});
