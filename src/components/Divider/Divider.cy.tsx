/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Divider, DividerHeight, DividerStyle } from './Divider';

const DEFAULT_COLOR = 'rgb(204, 204, 204)';
const COLOR_RGB = 'rgb(64, 101, 174)';
const COLOR_HEX = '#4065AE';
const DIVIDER_SELECTOR = '[data-test-id=divider]';
const DIVIDER_HR_SELECTOR = '[data-test-id=divider-hr]';

describe('Divider component', () => {
    it('renders', () => {
        cy.mount(<Divider />);

        cy.get(DIVIDER_SELECTOR).should('exist');
        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.css', 'border-top-color', DEFAULT_COLOR);
    });

    it('has the correct color code', () => {
        cy.mount(<Divider color={COLOR_HEX} />);

        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.css', 'border-top-color', COLOR_RGB);
    });

    it("allows the height to be set to 'Small'", () => {
        cy.mount(<Divider height={DividerHeight.Small} />);

        cy.get(DIVIDER_SELECTOR).should('exist').and('have.css', 'height', DividerHeight.Small);
    });

    it("allows the height to be set to 'Medium'", () => {
        cy.mount(<Divider height={DividerHeight.Medium} />);

        cy.get(DIVIDER_SELECTOR).should('exist').and('have.css', 'height', DividerHeight.Medium);
    });

    it("allows the height to be set to 'Large'", () => {
        cy.mount(<Divider height={DividerHeight.Large} />);

        cy.get(DIVIDER_SELECTOR).should('exist').and('have.css', 'height', DividerHeight.Large);
    });

    it('allows the divider border style to be dashed', () => {
        cy.mount(<Divider style={DividerStyle.Dashed} />);

        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.class', 'tw-border-dashed');
    });

    it('allows the divider to have no border', () => {
        cy.mount(<Divider style={DividerStyle.NoLine} />);

        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.class', 'tw-border-none');
    });

    it('allows the divider border style to be solid', () => {
        cy.mount(<Divider style={DividerStyle.Solid} />);

        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.class', 'tw-border-solid');
    });

    it('allows the divider border style to be dotted', () => {
        cy.mount(<Divider style={DividerStyle.Dotted} />);

        cy.get(DIVIDER_HR_SELECTOR).should('exist').and('have.class', 'tw-border-dotted');
    });
});
