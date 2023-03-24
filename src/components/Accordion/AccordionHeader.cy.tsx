/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AccordionHeader } from './AccordionHeader';
import { ACCORDION_ICON_CONTAINER_ID, ADDREMOVE_ICON_CONTAINER_ID } from '@components/FieldsetHeader';
import { SWITCH_ID } from '../Switch/Switch';
import { IconIcon12 } from '@foundation/Icon/Generated';

const FIELDSET_HEADER_ID = '[data-test-id="fieldset-header"]';
const ACCORDION_HEADER_TEXT_ID = '[data-test-id="accordion-header-text"]';
const FIELDSET_SWITCH_CONTAINER_ID = `[data-test-id="${SWITCH_ID}"]`;
const FIELDSET_ACCORDION_ICON_CONTAINER_ID = `[data-test-id="${ACCORDION_ICON_CONTAINER_ID}"]`;
const FIELDSET_ADDREMOVE_ICON_CONTAINER_ID = `[data-test-id="${ADDREMOVE_ICON_CONTAINER_ID}"]`;
const HEADER_ICON_CONTAINER_ID = '[data-test-id="header-icon-container"]';
const HEADER_DECORATOR_ID = '[data-test-id="accordion-header-decorator"]';

const MEDIUM_SWITCH_WIDTH = 30;
const SMALL_SWITCH_WIDTH = 22;

const LARGE_ACCORDION_ICON_WIDTH = 20;
const MEDIUM_ACCORDION_ICON_WIDTH = 16;
const SMALL_ACCORDION_ICON_WIDTH = 12;

const LARGE_ADDREMOVE_ICON_WIDTH = 20;
const MEDIUM_ADDREMOVE_ICON_WIDTH = 16;
const SMALL_ADDREMOVE_ICON_WIDTH = 12;

describe('AccordionHeader Component', () => {
    it('should render', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);
        cy.get(FIELDSET_HEADER_ID).should('exist');
    });

    it('should have dark gray text if isOpen is false', () => {
        cy.mount(<AccordionHeader isOpen={false}>Title</AccordionHeader>);
        cy.get(FIELDSET_HEADER_ID).should('have.class', 'tw-text-black-80');
    });

    it('should have black text if isOpen is true', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);
        cy.get(FIELDSET_HEADER_ID).should('have.class', 'tw-text-black');
    });

    it('should render children', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);
        cy.get(FIELDSET_HEADER_ID).should(($input) => {
            expect($input).to.contain('Title');
        });
    });

    it('should have light gray text when disabled', () => {
        cy.mount(
            <AccordionHeader isOpen disabled={true}>
                Title
            </AccordionHeader>,
        );

        cy.get(FIELDSET_HEADER_ID).should('have.class', 'tw-text-black-40');
    });

    it('should have white text when dark theme is active and when disabled prop is set to false', () => {
        cy.mount(
            <AccordionHeader isOpen disabled={false}>
                Title
            </AccordionHeader>,
        );

        cy.get(FIELDSET_HEADER_ID).should('have.class', 'dark:tw-text-white');
    });

    it('should have font set to medium weight when bold prop is set to false', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(ACCORDION_HEADER_TEXT_ID).should('have.class', 'tw-font-normal');
    });

    it('should have bold text when bold prop is set to true', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(ACCORDION_HEADER_TEXT_ID).should('have.class', 'tw-font-medium');
    });

    it('renders switch type', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(FIELDSET_SWITCH_CONTAINER_ID).should('exist');
    });

    it('renders accordion type', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('exist');
    });

    it('renders addremove type', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).should('exist');
    });

    it('renders default type', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).should('be.empty');
    });

    it('renders empty icon container when type is set to Default and size is set to large', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', 0);
    });

    it('renders empty icon container when type is set to Default and size is set to medium', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', 0);
    });

    it('renders empty icon container when type is set to Default and size is set to small', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', 0);
    });

    it('renders with large switch', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', MEDIUM_SWITCH_WIDTH);
    });

    it('renders with medium switch', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', MEDIUM_SWITCH_WIDTH);
    });

    it('renders with small switch', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', SMALL_SWITCH_WIDTH);
    });

    it('renders with small accordion icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', SMALL_ACCORDION_ICON_WIDTH);
    });

    it('renders with medium accordion icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', MEDIUM_ACCORDION_ICON_WIDTH);
    });

    it('renders with large accordion icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', LARGE_ACCORDION_ICON_WIDTH);
    });

    it('renders with large addremove icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', LARGE_ADDREMOVE_ICON_WIDTH);
    });

    it('renders with medium addremove icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', MEDIUM_ADDREMOVE_ICON_WIDTH);
    });

    it('renders with small addremove icon', () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(HEADER_ICON_CONTAINER_ID).invoke('width').should('equal', SMALL_ADDREMOVE_ICON_WIDTH);
    });

    it('renders with a decorator', () => {
        cy.mount(
            <AccordionHeader isOpen decorator={<IconIcon12 />}>
                Title
            </AccordionHeader>,
        );

        cy.get(HEADER_DECORATOR_ID).should('exist');
    });

    it("renders with 'as' prop", () => {
        cy.mount(<AccordionHeader isOpen>Title</AccordionHeader>);

        cy.get(FIELDSET_HEADER_ID).should('exist');
    });
});
