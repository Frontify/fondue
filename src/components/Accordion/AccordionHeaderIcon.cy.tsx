/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AccordionHeaderIcon } from './AccordionHeaderIcon';
import {
    ACCORDION_ICON_CONTAINER_ID,
    ADDREMOVE_ICON_CONTAINER_ID,
    FieldsetHeaderSize,
    FieldsetHeaderType,
} from '@components/FieldsetHeader';
import { SWITCH_ID } from '../Switch/Switch';

const FIELDSET_SWITCH_CONTAINER_ID = `[data-test-id="${SWITCH_ID}"]`;
const FIELDSET_ACCORDION_ICON_CONTAINER_ID = `[data-test-id="${ACCORDION_ICON_CONTAINER_ID}"]`;
const FIELDSET_ADDREMOVE_ICON_CONTAINER_ID = `[data-test-id="${ADDREMOVE_ICON_CONTAINER_ID}"]`;
const FIELDSET_ICON_WRAPPER_ID = '[data-test-id="fieldset-icon-wrapper"]';
const FIELDSET_SWITCH_ID = '[data-test-id="switch"]';

const MEDIUM_SWITCH_WIDTH = 28;
const SMALL_SWITCH_WIDTH = 20;

const LARGE_ACCORDION_ICON_WIDTH = 20;
const MEDIUM_ACCORDION_ICON_WIDTH = 16;
const SMALL_ACCORDION_ICON_WIDTH = 12;

const LARGE_ADDREMOVE_ICON_WIDTH = 20;
const MEDIUM_ADDREMOVE_ICON_WIDTH = 16;
const SMALL_ADDREMOVE_ICON_WIDTH = 12;

describe('AccordionHeaderIcon Component', () => {
    it('should render disabled switch', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.Switch} disabled={true} />);
        cy.get(FIELDSET_SWITCH_CONTAINER_ID).find('button').should('have.attr', 'disabled');
    });

    it('should render switch in on mode when isOpen is true', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.Switch} />);
        cy.get(FIELDSET_SWITCH_CONTAINER_ID).find('button').should('have.value', 'true');
    });

    it('should render switch in off mode when isOpen is false', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} type={FieldsetHeaderType.Switch} />);
        cy.get(FIELDSET_SWITCH_CONTAINER_ID).find('button').should('have.value', 'false');
    });

    it('should render minus icon if isOpen is true and type is AddRemove', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.AddRemove} />);
        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).find('svg').should('have.attr', 'name', 'IconMinus16');
    });

    it('should render plus icon if isOpen is false and type is AddRemove', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} type={FieldsetHeaderType.AddRemove} />);
        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).find('svg').should('have.attr', 'name', 'IconPlus16');
    });

    it('should render rotated caret icon if isOpen is true and type is Accordion', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.Accordion} />);
        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('have.class', 'tw-rotate-180');
    });

    it('should render normal caret icon if isOpen is false and type is Accordion', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} type={FieldsetHeaderType.Accordion} />);
        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('not.have.class', 'tw-rotate-180');
    });

    it('should have light gray icon when disabled and type is Accordion', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.Accordion} disabled={true} />);

        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('have.class', 'tw-text-black-40');
    });

    it('should have light gray icon when disabled and type is AddRemove', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.AddRemove} disabled={true} />);

        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).should('have.class', 'tw-text-black-40');
    });

    it('should have black icon when isOpen is true and type is Accordion', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.Accordion} />);

        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('have.class', 'tw-text-black');
    });

    it('should have black icon when isOpen is true and type is AddRemove', () => {
        cy.mount(<AccordionHeaderIcon isOpen type={FieldsetHeaderType.AddRemove} />);

        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).should('have.class', 'tw-text-black');
    });

    it('should have dark gray icon when isOpen is false and type is Accordion', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} type={FieldsetHeaderType.Accordion} />);

        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('have.class', 'tw-text-black-80');
    });

    it('should have dark gray icon when isOpen is false and type is AddRemove', () => {
        cy.mount(<AccordionHeaderIcon isOpen={false} type={FieldsetHeaderType.AddRemove} />);

        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).should('have.class', 'tw-text-black-80');
    });

    it('renders switch type', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen type={FieldsetHeaderType.Switch}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_SWITCH_CONTAINER_ID).should('exist');
    });

    it('renders accordion type', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen type={FieldsetHeaderType.Accordion}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ACCORDION_ICON_CONTAINER_ID).should('exist');
    });

    it('renders addremove type', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen type={FieldsetHeaderType.AddRemove}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ADDREMOVE_ICON_CONTAINER_ID).should('exist');
    });

    it('renders empty icon container when type is set to Default', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen type={FieldsetHeaderType.Default}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).should('not.exist');
    });

    it('renders with large switch', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Large} type={FieldsetHeaderType.Switch}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_SWITCH_ID).invoke('width').should('be.closeTo', MEDIUM_SWITCH_WIDTH, 2);
    });

    it('renders with medium switch', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Medium} type={FieldsetHeaderType.Switch}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_SWITCH_ID).invoke('width').should('be.closeTo', MEDIUM_SWITCH_WIDTH, 2);
    });

    it('renders with small switch', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Small} type={FieldsetHeaderType.Switch}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_SWITCH_ID).invoke('width').should('be.closeTo', SMALL_SWITCH_WIDTH, 2);
    });

    it('renders with small accordion icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Small} type={FieldsetHeaderType.Accordion}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', SMALL_ACCORDION_ICON_WIDTH);
    });

    it('renders with medium accordion icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Medium} type={FieldsetHeaderType.Accordion}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', MEDIUM_ACCORDION_ICON_WIDTH);
    });

    it('renders with large accordion icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Large} type={FieldsetHeaderType.Accordion}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', LARGE_ACCORDION_ICON_WIDTH);
    });

    it('renders with large addremove icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Large} type={FieldsetHeaderType.AddRemove}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', LARGE_ADDREMOVE_ICON_WIDTH);
    });

    it('renders with medium addremove icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Medium} type={FieldsetHeaderType.AddRemove}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', MEDIUM_ADDREMOVE_ICON_WIDTH);
    });

    it('renders with small addremove icon', () => {
        cy.mount(
            <AccordionHeaderIcon isOpen size={FieldsetHeaderSize.Small} type={FieldsetHeaderType.AddRemove}>
                Title
            </AccordionHeaderIcon>,
        );

        cy.get(FIELDSET_ICON_WRAPPER_ID).find('svg').invoke('width').should('equal', SMALL_ADDREMOVE_ICON_WIDTH);
    });
});
