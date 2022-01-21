/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BUTTON_ID } from "@components/Button/Button.spec";
import { BRAND_COLOR_ID, COLOR_PREVIEW_ID } from "@components/ColorPicker/ColorPicker.spec";
import { MENU_ITEM_DECORATOR_ID } from "@components/MenuItem/MenuItem.spec";
import { mount } from "@cypress/react";
import { EXAMPLE_PALETTES } from "@utilities/colors";
import { Color, Palette } from "../../types/colors";
import React, { FC, useState } from "react";
import { ColorPickerFlyout } from "./ColorPickerFlyout";

const TRIGGER_ID = "[data-test-id=trigger]";
const TEST_COLOR = { hex: "#0085ff", rgb: "rgb(0, 133, 255)" };

type Props = {
    palettes?: Palette[];
    currentColor?: Color;
};

const Component: FC<Props> = ({ palettes, currentColor = null }) => {
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);
    const [selectedColor, setSelectedColor] = useState<Color | null>(currentColor);

    return (
        <ColorPickerFlyout
            currentColor={temporaryColor ?? selectedColor}
            onClick={() => setSelectedColor(temporaryColor)}
            onClose={() => setTemporaryColor(null)}
            onSelect={(color) => setTemporaryColor(color)}
            palettes={palettes}
        />
    );
};

describe("ColorInputFlyout Component", () => {
    it("should render without initial color", () => {
        mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(TRIGGER_ID).should("contain", "Select color");
        cy.get(TRIGGER_ID).click();
        cy.get(BRAND_COLOR_ID).first().click();
        cy.get(BUTTON_ID).last().click();
        cy.get(TRIGGER_ID).should("contain", "90");
        cy.get(MENU_ITEM_DECORATOR_ID).children("span").invoke("attr", "style").should("include", "rgb(153, 33, 54)");
    });

    it("should render with initial color", () => {
        mount(<Component currentColor={{ hex: TEST_COLOR.hex, alpha: 1 }} />);

        cy.get(TRIGGER_ID).should("contain", TEST_COLOR.hex).click();
        cy.get(COLOR_PREVIEW_ID).should("contain", TEST_COLOR.hex);
        cy.get(MENU_ITEM_DECORATOR_ID).children("span").invoke("attr", "style").should("include", TEST_COLOR.rgb);
    });
});
