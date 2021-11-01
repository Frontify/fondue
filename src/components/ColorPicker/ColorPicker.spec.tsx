/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DROPDOWN_TRIGGER_ID } from "@components/Dropdown/Dropdown.spec";
import { MENU_ITEM_ID } from "@components/MenuItem/MenuItem.spec";
import { ICON_ITEM_ID, TEXT_ITEM_ID } from "@components/Slider/Slider.spec";
import { mount } from "@cypress/react";
import { EXAMPLE_PALETTES } from "@utilities/colors";
import React, { FC, useState } from "react";
import { Color } from "../../types/colors";
import { ColorPicker, Palette } from "./ColorPicker";

export const BRAND_COLOR_ID = "[data-test-id=brand-color]";
export const COLOR_PREVIEW_ID = "[data-test-id=color-preview]";
const BRAND_COLOR_PICKER_ID = "[data-test-id=brand-color-picker]";
const CUSTOM_COLOR_PICKER_ID = "[data-test-id=custom-color-picker]";
const COLOR_INPUT_ID = "[data-test-id=color-input]";
const TEXT_INPUT_ID = "[data-test-id=text-input]";

type Props = {
    palettes?: Palette[];
    currentColor?: Color;
};

const Component: FC<Props> = ({ palettes, currentColor = { hex: "#FF0000", alpha: 1 } }) => {
    const [selectedColor, setSelectedColor] = useState<Color>(currentColor);

    return (
        <ColorPicker currentColor={selectedColor} onSelect={(color) => setSelectedColor(color)} palettes={palettes} />
    );
};

describe("ColorPicker Component", () => {
    it("should render custom color picker", () => {
        mount(<Component />);

        cy.get(CUSTOM_COLOR_PICKER_ID).should("exist");
        cy.get(COLOR_PREVIEW_ID).should("contain", "#FF0000");
        cy.get(DROPDOWN_TRIGGER_ID).should("contain", "HEX");
        cy.get(COLOR_INPUT_ID).should("have.length", 2);
        cy.get(DROPDOWN_TRIGGER_ID).click().get(MENU_ITEM_ID).eq(1).click();
        cy.get(DROPDOWN_TRIGGER_ID).should("contain", "RGBA");
        cy.get(COLOR_INPUT_ID).should("have.length", 4);
    });

    it("should render brand color picker", () => {
        mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(BRAND_COLOR_PICKER_ID).should("exist");
        cy.get(BRAND_COLOR_ID).should("have.length", 18);
        cy.get(TEXT_ITEM_ID).last().click();
        cy.get(CUSTOM_COLOR_PICKER_ID).should("exist");
    });

    it("should change palette display", () => {
        mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(BRAND_COLOR_ID).parent("ul").should("not.have.class", "tw-flex-col");
        cy.get(ICON_ITEM_ID).last().click();
        cy.get(BRAND_COLOR_ID).parent("ul").should("have.class", "tw-flex-col");
    });

    it("should display correct search results", () => {
        mount(<Component palettes={EXAMPLE_PALETTES} />);

        cy.get(TEXT_INPUT_ID).type("90");
        cy.get(BRAND_COLOR_ID).should("have.length", 3);
        cy.get(TEXT_INPUT_ID).clear().type("red");
        cy.get(BRAND_COLOR_ID).should("have.length", 6);
        cy.get(TEXT_INPUT_ID).clear().type("foo");
        cy.get(BRAND_COLOR_PICKER_ID).children("ul").should("contain", "No Colors found");
    });
});
