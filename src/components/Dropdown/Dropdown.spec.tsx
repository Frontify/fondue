/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";
import { mount } from "@cypress/react";
import { Size } from "@utilities/enum";
import { MENU_ITEM_ACTIVE_ID, MENU_ITEM_ID, MENU_ITEM_TITLE_ID } from "./DropdownMenuItem/DropdownMenuItem.spec";

const DROPDOWN_TRIGGER_ID = "[data-test-id=dropdown-trigger]";
const DROPDOWN_ITEM_LIST_ID = "[data-test-id=dropdown-item-list]";
const DROPDOWN_ITEM_SUBTITLE = "[data-test-id=dropdown-menu-item-subtitle]";
const DROPDOWN_CLEAR_BUTTON_ID = "[data-test-id=dropdown-clear-button]";

const SMALL_ITEMS: DropdownProps["menuBlocks"] = [
    {
        id: "small-block",
        menuItems: [
            {
                id: "1",
                title: "Small",
                size: Size.Small,
            },
            {
                id: "2",
                title: "Small second",
                size: Size.Small,
            },
            {
                id: "3",
                title: "Small third",
                size: Size.Small,
            },
        ],
    },
];

const FIRST_ITEM_ID = SMALL_ITEMS[0].menuItems[0].id;

const LARGE_ITEMS: DropdownProps["menuBlocks"] = [
    {
        id: "large-block-1",
        menuItems: [
            {
                id: "4",
                title: "Large",
                subtitle: "Subtitle",
                size: Size.Large,
            },
            {
                id: "5",
                title: "Large second",
                subtitle: "Subtitle",
                size: Size.Large,
            },
        ],
    },
    {
        id: "large-block-2",
        menuItems: [
            {
                id: "6",
                title: "Large third",
                subtitle: "Subtitle",
                size: Size.Large,
            },
            {
                id: "7",
                title: "Large fourth",
                subtitle: "Subtitle",
                size: Size.Large,
            },
        ],
    },
];

type Props = {
    menuBlocks: DropdownProps["menuBlocks"];
    size?: DropdownProps["size"];
    placeholder?: string;
    initialActiveId?: string;
    clearable?: boolean;
};

const Component: FC<Props> = ({ menuBlocks, placeholder, initialActiveId, size = Size.Small, clearable = false }) => {
    const [activeItemId, setActiveItemId] = useState(initialActiveId);
    return (
        <Dropdown
            activeItemId={activeItemId}
            onChange={setActiveItemId}
            menuBlocks={menuBlocks}
            placeholder={placeholder}
            size={size}
            clearable={clearable}
        />
    );
};

describe("Dropdown Component", () => {
    it("renders with placeholder", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} placeholder="Select item" />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Select item");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).children().should("have.length", 3);
    });
    it("renders with initial active item", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} initialActiveId={FIRST_ITEM_ID} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ACTIVE_ID).should("exist").and("have.length", 2);
    });
    it("changes selection on click", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} initialActiveId={FIRST_ITEM_ID} />);
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
        mount(<Component menuBlocks={SMALL_ITEMS} placeholder="Select item" clearable />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ID).first().as("firstListItem");

        cy.get("@firstListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@firstListItem").should("have.attr", "aria-selected", "true");
        cy.get(DROPDOWN_CLEAR_BUTTON_ID).click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Select item");
        cy.get("@firstListItem").should("have.attr", "aria-selected", "false");
    });
    it("renders large items", () => {
        mount(
            <Component menuBlocks={LARGE_ITEMS} size={Size.Large} initialActiveId={LARGE_ITEMS[0].menuItems[0].id} />,
        );
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).should("have.length", 2);
        cy.get(DROPDOWN_ITEM_SUBTITLE).should("exist");
    });
});
