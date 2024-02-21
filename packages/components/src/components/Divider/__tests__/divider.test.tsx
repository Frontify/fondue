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
    test('has correct color', async () => {
        render(<Divider color={COLOR_HEX} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveStyle({ borderTopColor: COLOR_HEX });
    });
    test('allows the height to be set to Small', async () => {
        render(<Divider height={DividerHeight.Small} />);
        const divider = await screen.findByTestId(DIVIDER_SELECTOR);
        expect(divider).toHaveStyle({ height: DividerHeight.Small });
    });

    test('allows the height to be set to Medium', async () => {
        render(<Divider height={DividerHeight.Medium} />);
        const divider = await screen.findByTestId(DIVIDER_SELECTOR);
        expect(divider).toHaveStyle({ height: DividerHeight.Medium });
    });

    test('allows the height to be set to Large', async () => {
        render(<Divider height={DividerHeight.Large} />);
        const divider = await screen.findByTestId(DIVIDER_SELECTOR);
        expect(divider).toHaveStyle({ height: DividerHeight.Large });
    });

    test('allows the divider border style to be dashed', async () => {
        render(<Divider style={DividerStyle.Dashed} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveClass('tw-border-dashed');
    });

    test('allows the divider to have no border', async () => {
        render(<Divider style={DividerStyle.NoLine} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveClass('tw-border-none');
    });

    test('allows the divider to have solid border', async () => {
        render(<Divider style={DividerStyle.Solid} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveClass('tw-border-solid');
    });

    test('allows the divider to have dotted border', async () => {
        render(<Divider style={DividerStyle.Dotted} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveClass('tw-border-dotted');
    });

    test('allows the divider to be vertical', async () => {
        render(<Divider vertical={true} />);
        const divider = await screen.findByTestId(DIVIDER_LINE_SELECTOR);
        expect(divider).toHaveClass('tw-border-r');
    });

    test('allows the divider to have a custom test-id', async () => {
        render(<Divider data-test-id="custom-divider-test-id" />);
        const divider = await screen.findByTestId('custom-divider-test-id');
        expect(divider);
    });

    /*




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
