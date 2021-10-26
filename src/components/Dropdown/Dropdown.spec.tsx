/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MENU_ITEM_ACTIVE_ID, MENU_ITEM_ID, MENU_ITEM_TITLE_ID } from "@components/Menu/MenuItem/MenuItem.spec";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { MenuBlock } from "@components/Menu/SelectMenu";
import { mount } from "@cypress/react";
import React, { FC, useState } from "react";
import { Dropdown } from "./Dropdown";

export const DROPDOWN_TRIGGER_ID = "[data-test-id=dropdown-trigger]";
const DROPDOWN_CLEAR_BUTTON_ID = "[data-test-id=dropdown-clear-button]";
const MENU_ITEM_LIST_ID = "[data-test-id=menu-item-list]";
const TRIGGER_ID = "[data-test-id=trigger]";

const ITEMS = [
    {
        id: "small-block",
        menuItems: [
            {
                id: "1",
                title: "Small",
                size: MenuItemContentSize.Small,
            },
            {
                id: "2",
                title: "Small second",
                size: MenuItemContentSize.Small,
            },
            {
                id: "3",
                title: "Small third",
                size: MenuItemContentSize.Small,
            },
        ],
    },
];

const FIRST_ITEM_ID = ITEMS[0].menuItems[0].id;

type Props = {
    menuBlocks: MenuBlock[];
    placeholder?: string;
    initialActiveId?: string | number;
    clearable?: boolean;
    disabled?: boolean;
};

const Component: FC<Props> = ({ menuBlocks, placeholder, initialActiveId, clearable = false, disabled = false }) => {
    const [activeItemId, setActiveItemId] = useState(initialActiveId);
    return (
        <Dropdown
            activeItemId={activeItemId}
            onChange={setActiveItemId}
            menuBlocks={menuBlocks}
            placeholder={placeholder}
            clearable={clearable}
            disabled={disabled}
        />
    );
};

describe("Dropdown Component", () => {
    it("renders with placeholder", () => {
        mount(<Component menuBlocks={ITEMS} placeholder="Select item" />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Select item");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_LIST_ID).children().should("have.length", 3);
    });

    it("renders with initial active item", () => {
        mount(<Component menuBlocks={ITEMS} initialActiveId={FIRST_ITEM_ID} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist").and("have.length", 1);
    });

    it("changes selection on click", () => {
        mount(<Component menuBlocks={ITEMS} initialActiveId={FIRST_ITEM_ID} />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ID).first().as("firstListItem");
        cy.get(MENU_ITEM_ID).eq(1).as("secondListItem");
        cy.get(MENU_ITEM_ID).eq(2).as("thirdListItem");

        cy.get("@secondListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small second");

        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@firstListItem").should("have.attr", "aria-selected", "false");
        cy.get("@secondListItem").should("have.attr", "aria-selected", "true");
        cy.get("@thirdListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small third");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@thirdListItem").should("have.attr", "aria-selected", "true");
        cy.get("@secondListItem").should("have.attr", "aria-selected", "false");
    });

    it("renders with clearable option", () => {
        mount(<Component menuBlocks={ITEMS} placeholder="Select item" clearable />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ID).first().as("firstListItem");

        cy.get("@firstListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@firstListItem").should("have.attr", "aria-selected", "true");
        cy.get(DROPDOWN_CLEAR_BUTTON_ID).click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Select item");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@firstListItem").should("have.attr", "aria-selected", "false");
    });

    it("should not focus the dropdown when disabled", () => {
        mount(<Component menuBlocks={ITEMS} disabled={true} />);

        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(TRIGGER_ID).should("not.have.class", "tw-ring-4").and("not.have.class", "tw-ring-blue");
    });
});
