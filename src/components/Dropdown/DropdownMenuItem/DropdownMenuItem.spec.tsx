/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { MenuItem, MenuItemContentSize } from "@components/Dropdown/MenuItemContent/MenuItemContent";
import { mount } from "@cypress/react";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import { IconSize } from "@elements/Icon/IconSize";

export const MENU_ITEM_ID = "[data-test-id=dropdown-menu-item]";
export const MENU_ITEM_ACTIVE_ID = "[data-test-id=dropdown-menu-item-active]";
export const MENU_ITEM_TITLE_ID = "[data-test-id=dropdown-menu-item-title]";
export const MENU_ITEM_TEXT_ID = "[data-test-id=dropdown-menu-item-text]";
const MENU_ITEM_ICON_ID = "[data-test-id=dropdown-menu-item-icon]";
const MENU_ITEM_SUBTITLE_ID = "[data-test-id=dropdown-menu-item-subtitle]";

const ITEMS: MenuItem[] = [
    {
        id: "1",
        title: "Small",
        size: MenuItemContentSize.Small,
        icon: <IconAudio size={IconSize.Size16} />,
    },
    {
        id: "2",
        title: "Small",
        size: MenuItemContentSize.Small,
    },
    {
        id: "3",
        title: "Large icon",
        subtitle: "Large icon subtitle",
        icon: <IconAudio size={IconSize.Size16} />,
        size: MenuItemContentSize.Large,
    },
    {
        id: "4",
        title: "Large icon",
        subtitle: "Large icon subtitle",
        size: MenuItemContentSize.Large,
    },
];

describe("DropdownMenuItem Component", () => {
    it("renders small item with icon", () => {
        mount(<DropdownMenuItem {...ITEMS[0]} />);
        cy.get(MENU_ITEM_TEXT_ID).should("not.exist");
        cy.get(MENU_ITEM_ICON_ID).should("exist");
        cy.get(MENU_ITEM_ICON_ID).contains("Small");
        cy.get(MENU_ITEM_SUBTITLE_ID).should("not.exist");
    });

    it("renders small item without icon", () => {
        mount(<DropdownMenuItem {...ITEMS[1]} />);
        cy.get(MENU_ITEM_TEXT_ID).should("exist");
        cy.get(MENU_ITEM_ICON_ID).should("not.exist");
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(MENU_ITEM_SUBTITLE_ID).should("not.exist");
    });

    it("renders small active item", () => {
        mount(<DropdownMenuItem {...ITEMS[1]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist");
    });

    it("renders large item with icon", () => {
        mount(<DropdownMenuItem {...ITEMS[2]} />);
        cy.get(MENU_ITEM_TEXT_ID).should("not.exist");
        cy.get(MENU_ITEM_ICON_ID).should("exist");
        cy.get(MENU_ITEM_TITLE_ID).contains("Large icon");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large icon subtitle");
    });

    it("renders large item without icon", () => {
        mount(<DropdownMenuItem {...ITEMS[3]} />);
        cy.get(MENU_ITEM_TEXT_ID).should("exist");
        cy.get(MENU_ITEM_ICON_ID).should("not.exist");
        cy.get(MENU_ITEM_TITLE_ID).contains("Large icon");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large icon subtitle");
    });

    it("renders large active item", () => {
        mount(<DropdownMenuItem {...ITEMS[3]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist");
    });
});
