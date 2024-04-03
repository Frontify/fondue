/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, useState } from 'react';

import { type Color, type Palette } from '../../types/colors';
import { EXAMPLE_PALETTES } from '../ColorPicker/example-palettes';

import { ColorPickerFlyout } from './ColorPickerFlyout';

const TRIGGER_ID = '[data-test-id=trigger]';
const TEST_COLOR = { red: 0, green: 133, blue: 255 };
const TEST_COLOR_HEX = '#0085ff';
const TEST_COLOR_RGB = 'rgb(0, 133, 255)';
const BUTTON_ID = '[data-test-id=button]';
const BRAND_COLOR_ID = '[data-test-id=brand-color]';
const COLOR_PREVIEW_ID = '[data-test-id=color-preview]';
const MENU_ITEM_DECORATOR_ID = '[data-test-id=menu-item-decorator]';
const CLEAR_BUTTON_ID = '[data-test-id=dropdown-clear-button]';

type Props = {
    palettes?: Palette[];
    currentColor?: Nullable<Color>;
    clearable?: boolean;
};

const Component = ({ palettes, currentColor = null, clearable = false }: Props): ReactElement => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color | null>(currentColor);

    return (
        <ColorPickerFlyout
            currentColor={temporaryColor ?? selectedColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(null)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={palettes}
            clearable={clearable}
            onClear={() => {
                setTemporaryColor(null);
                setSelectedColor(temporaryColor);
            }}
        />
    );
};

describe('ColorInputFlyout Component', () => {
    it('should render without initial color', () => {
        cy.mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(TRIGGER_ID).should('contain', 'Select color');
        cy.get(TRIGGER_ID).click();
        cy.get(BRAND_COLOR_ID).first().click();
        cy.get(BUTTON_ID).last().click();
        cy.get(TRIGGER_ID).should('contain', '90');
        cy.get(MENU_ITEM_DECORATOR_ID).children('span').invoke('attr', 'style').should('include', 'rgb(153, 33, 54)');
    });

    it('should render with initial color', () => {
        cy.mount(<Component currentColor={TEST_COLOR} />);

        cy.get(TRIGGER_ID).should('contain', TEST_COLOR_HEX).click();
        cy.get(COLOR_PREVIEW_ID).should('have.css', 'background-color', TEST_COLOR_RGB);
        cy.get(MENU_ITEM_DECORATOR_ID)
            .children('span')
            .invoke('attr', 'style')
            .should('include', `rgb(${Object.values(TEST_COLOR).join(', ')})`);
    });

    it('should reset color when clearing', () => {
        cy.mount(<Component currentColor={TEST_COLOR} clearable={true} />);

        cy.get(CLEAR_BUTTON_ID).click();
        cy.get(TRIGGER_ID).should('contain', 'Select color');
    });
});
