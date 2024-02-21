/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Divider, DividerHeight, DividerStyle } from '../Divider';

const DEFAULT_COLOR = 'rgb(204, 204, 204)';
const DEFAULT_COLOR_HEX = '#CCC';
const COLOR_RGB = 'rgb(64, 101, 174)';
const COLOR_HEX = '#4065AE';
const DIVIDER_SELECTOR = 'fondue-divider';
const DIVIDER_LINE_SELECTOR = 'fondue-divider-line';

describe('Divider component', () => {
    test('loads and displays divider', async () => {
        render(<Divider />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveStyle({ borderTopColor: DEFAULT_COLOR_HEX });
    });
    /*
    it('renders', () => {
        cy.mount(<Divider />);

        cy.get(DIVIDER_SELECTOR).should('exist');
        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.css', 'border-top-color', DEFAULT_COLOR);
    });

    it('has the correct color code', () => {
        cy.mount(<Divider color={COLOR_HEX} />);

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.css', 'border-top-color', COLOR_RGB);
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

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-dashed');
    });

    it('allows the divider to have no border', () => {
        cy.mount(<Divider style={DividerStyle.NoLine} />);

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-none');
    });

    it('allows the divider border style to be solid', () => {
        cy.mount(<Divider style={DividerStyle.Solid} />);

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-solid');
    });

    it('allows the divider border style to be dotted', () => {
        cy.mount(<Divider style={DividerStyle.Dotted} />);

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-dotted');
    });

    it('allows the divider border style to be dotted', () => {
        cy.mount(<Divider style={DividerStyle.Dotted} />);

        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-dotted');
    });

    it('allows the divider to be vertical', () => {
        cy.mount(<Divider vertical={true} />);

        cy.get(`div${DIVIDER_SELECTOR}`).should('exist');
        cy.get(DIVIDER_LINE_SELECTOR).should('exist').and('have.class', 'tw-border-r');
    });

    it('should render with custom data-test-id', () => {
        cy.mount(<Divider data-test-id="custom-divider-test-id" />);

        cy.get('[data-test-id=custom-divider-test-id]').as('Divider');
        cy.get('@Divider').should('exist');
    });
    */
});
