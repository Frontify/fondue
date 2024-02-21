/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { Color, ColorFormat, Palette } from '../../types/colors';
import { ColorPicker } from './ColorPicker';
import { EXAMPLE_PALETTES } from './example-palettes';

const BRAND_COLOR_ID = '[data-test-id=brand-color]';
const COLOR_PREVIEW_ID = '[data-test-id=color-preview]';
const BRAND_COLOR_PICKER_ID = '[data-test-id=brand-color-picker]';
const CUSTOM_COLOR_PICKER_ID = '[data-test-id=custom-color-picker]';
const COLOR_INPUT_ID = '[data-test-id=color-input]';
const TEXT_INPUT_ID = '[data-test-id=text-input]';
const DROPDOWN_TRIGGER_ID = '[data-test-id=dropdown-trigger]';
const MENU_ITEM_ID = '[data-test-id=menu-item]';
const ICON_ITEM_ID = '[data-test-id=fondue-segmented-controls-item-icon]';
const TEXT_ITEM_ID = '[data-test-id=fondue-segmented-controls-item-text]';

type Props = {
    palettes?: Palette[];
    currentColor?: Color;
    allowCustomColor?: boolean;
};

const Component = ({ palettes, currentColor = { red: 255, green: 0, blue: 0 }, allowCustomColor = true }: Props) => {
    const [selectedColor, setSelectedColor] = useState<Color>(currentColor);
    const [currentFormat, setCurrentFormat] = useState(ColorFormat.Hex);

    return (
        <ColorPicker
            currentColor={selectedColor}
            currentFormat={currentFormat}
            setFormat={setCurrentFormat}
            onSelect={(color) => setSelectedColor(color)}
            palettes={palettes}
            allowCustomColor={allowCustomColor}
        />
    );
};

describe('ColorPicker Component', () => {
    it('should render custom color picker', () => {
        cy.mount(<Component />);

        cy.get(CUSTOM_COLOR_PICKER_ID).should('exist');
        cy.get(COLOR_PREVIEW_ID).should('have.css', 'background-color', 'rgb(255, 0, 0)');
        cy.get(DROPDOWN_TRIGGER_ID).should('contain', 'HEX');
        cy.get(COLOR_INPUT_ID).should('have.length', 2);
        cy.get(DROPDOWN_TRIGGER_ID).click().get(MENU_ITEM_ID).eq(1).click();
        cy.get(DROPDOWN_TRIGGER_ID).should('contain', 'RGBA');
        cy.get(COLOR_INPUT_ID).should('have.length', 4);
    });

    it('should render brand color picker', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(BRAND_COLOR_PICKER_ID).should('exist');
        cy.get(BRAND_COLOR_ID).should('have.length', 18);
        cy.get(TEXT_ITEM_ID).last().click();
        cy.get(CUSTOM_COLOR_PICKER_ID).should('exist');
    });

    it('should only render brand color picker', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES} allowCustomColor={false} />);

        cy.get(BRAND_COLOR_PICKER_ID).should('exist');
        cy.get(BRAND_COLOR_ID).should('have.length', 18);
        cy.get(TEXT_ITEM_ID).should('not.exist');
    });

    it('should change palette display', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(BRAND_COLOR_ID).parent('ul').should('not.have.class', 'tw-flex-col');
        cy.get(ICON_ITEM_ID).last().click();
        cy.get(BRAND_COLOR_ID).parent('ul').should('have.class', 'tw-flex-col');
    });

    it('should display correct search results', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(TEXT_INPUT_ID).type('90');
        cy.get(BRAND_COLOR_ID).should('have.length', 3);
        cy.get(TEXT_INPUT_ID).clear().type('red');
        cy.get(BRAND_COLOR_ID).should('have.length', 6);
        cy.get(TEXT_INPUT_ID).clear().type('foo');
        cy.get(BRAND_COLOR_PICKER_ID).children('ul').should('contain', 'No colors found');
    });

    it('should display message if no brand colors are found in palettes', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES.map((palette) => ({ ...palette, colors: [] }))} />);
        cy.get(BRAND_COLOR_PICKER_ID).should('exist');
        cy.get(BRAND_COLOR_ID).should('not.exist');
        cy.get(BRAND_COLOR_PICKER_ID).children('ul').should('contain', 'No colors found');
    });
});
