/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import { IconSize } from "@elements/Icon/IconSize";
import React from "react";
import { MenuItem, MenuItemProps } from "./MenuItem";
import { MenuItemContentSize, SelectionIndicatorIcon } from "./MenuItemContent";

export const MENU_ITEM_ID = "[data-test-id=menu-item]";
export const MENU_ITEM_ACTIVE_ID = "[data-test-id=menu-item-active]";
export const MENU_ITEM_TITLE_ID = "[data-test-id=menu-item-title]";
const MENU_ITEM_CONTENT_ID = "[data-test-id=menu-item-content]";
const MENU_ITEM_CARET_ID = "[data-test-id=menu-item-caret]";
const MENU_ITEM_DECORATOR_ID = "[data-test-id=menu-item-decorator]";
const MENU_ITEM_SUBTITLE_ID = "[data-test-id=menu-item-subtitle]";

const ITEMS: MenuItemProps[] = [
    {
        title: "Small",
        size: MenuItemContentSize.Small,
        decorator: <IconAudio size={IconSize.Size16} />,
    },
    {
        title: "Small",
        size: MenuItemContentSize.Small,
    },
    {
        title: "Small",
        size: MenuItemContentSize.Small,
        selectionIndicator: SelectionIndicatorIcon.CaretRight,
    },
    {
        title: "Large icon",
        subtitle: "Large icon subtitle",
        decorator: <IconAudio size={IconSize.Size16} />,
        size: MenuItemContentSize.Large,
    },
    {
        title: "Large icon",
        subtitle: "Large icon subtitle",
        size: MenuItemContentSize.Large,
    },
    {
        title: "Large icon",
        subtitle: "Large icon subtitle",
        size: MenuItemContentSize.Large,
        selectionIndicator: SelectionIndicatorIcon.CaretRight,
    },
];

describe("MenuItem Component", () => {
    it("renders small item with icon", () => {
        mount(<MenuItem {...ITEMS[0]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should("exist");
        cy.get(MENU_ITEM_CONTENT_ID).contains("Small");
        cy.get(MENU_ITEM_SUBTITLE_ID).should("not.exist");
    });

    it("renders small item without icon", () => {
        mount(<MenuItem {...ITEMS[1]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should("not.exist");
        cy.get(MENU_ITEM_CONTENT_ID).contains("Small");
        cy.get(MENU_ITEM_SUBTITLE_ID).should("not.exist");
    });

    it("renders small active item", () => {
        mount(<MenuItem {...ITEMS[1]} active />);
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist");
    });

    it("renders small item with caret indicator", () => {
        mount(<MenuItem {...ITEMS[2]} />);
        cy.get(MENU_ITEM_CARET_ID).should("exist");
    });

    it("renders large item with icon", () => {
        mount(<MenuItem {...ITEMS[3]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should("exist");
        cy.get(MENU_ITEM_TITLE_ID).contains("Large icon");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large icon subtitle");
    });

    it("renders large item without icon", () => {
        mount(<MenuItem {...ITEMS[4]} />);
        cy.get(MENU_ITEM_DECORATOR_ID).should("not.exist");
        cy.get(MENU_ITEM_TITLE_ID).contains("Large icon");
        cy.get(MENU_ITEM_SUBTITLE_ID).contains("Large icon subtitle");
    });

    it("renders large item with caret indicator", () => {
        mount(<MenuItem {...ITEMS[5]} />);
        cy.get(MENU_ITEM_CARET_ID).should("exist");
    });
});
