/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Size } from "@utilities/enum";
import { FC, useState } from "react";
import Dropdown, { DropdownProps } from "./Dropdown";
import css from "./Dropdown.module.css";
import { MENU_ITEM_ACTIVE_ID, MENU_ITEM_TEXT_ID, MENU_ITEM_TITLE_ID } from "./DropdownMenuItem/DropdownMenuItem.spec";

const DROPDOWN_ID = "[data-test-id=dropdown]";
const DROPDOWN_TRIGGER_ID = "[data-test-id=dropdown-trigger]";
const DROPDOWN_ITEM_LIST_ID = "[data-test-id=dropdown-item-list]";
const DROPDOWN_CLEAR_BUTTON_ID = "[data-test-id=dropdown-clear-button]";
const DROPDOWN_DIVIDER_ID = "[data-test-id=dropdown-divider]";
const BORDER_STYLE = "1px solid rgb(234, 235, 235)";

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

const Component: FC<Props> = ({
    menuBlocks,
    placeholder,
    initialActiveId,
    size = Size.Small,
    clearable = false,
}: Props) => {
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
        cy.get(DROPDOWN_TRIGGER_ID).should("have.class", css.placeholder);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).children().should("have.length", 3);
    });
    it("renders with initial active item", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} initialActiveId={FIRST_ITEM_ID} />);
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).should("not.have.class", css.inactive);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_TEXT_ID).first().children(MENU_ITEM_ACTIVE_ID).should("not.be.visible");
        cy.get(MENU_ITEM_TEXT_ID).eq(1).children(MENU_ITEM_ACTIVE_ID).should("exist");
    });
    it("changes selection on click", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} initialActiveId={FIRST_ITEM_ID} />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).children().first().as("firstListItem");
        cy.get(DROPDOWN_ITEM_LIST_ID).children().eq(1).as("secondListItem");
        cy.get(DROPDOWN_ITEM_LIST_ID).children().eq(2).as("thirdListItem");

        cy.get("@secondListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small second");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@secondListItem").children(MENU_ITEM_ACTIVE_ID).should("exist");
        cy.get("@firstListItem").children(MENU_ITEM_ACTIVE_ID).should("not.exist");
        cy.get("@thirdListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small third");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@thirdListItem").children(MENU_ITEM_ACTIVE_ID).should("exist");
        cy.get("@secondListItem").children(MENU_ITEM_ACTIVE_ID).should("not.exist");
    });
    it("renders with clearable option", () => {
        mount(<Component menuBlocks={SMALL_ITEMS} placeholder="Select item" clearable />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).children().first().as("firstListItem");

        cy.get("@firstListItem").click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("@firstListItem").children(MENU_ITEM_ACTIVE_ID).should("exist");
        cy.get(DROPDOWN_CLEAR_BUTTON_ID).click();
        cy.get(MENU_ITEM_TITLE_ID).contains("Select item");
        cy.get("@firstListItem").children(MENU_ITEM_ACTIVE_ID).should("not.exist");
    });
    it("renders large items with divider", () => {
        mount(
            <Component menuBlocks={LARGE_ITEMS} size={Size.Large} initialActiveId={LARGE_ITEMS[0].menuItems[0].id} />,
        );
        cy.get(DROPDOWN_ID).should("have.class", css.large);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_ITEM_LIST_ID).should("have.length", 2);
        cy.get(DROPDOWN_DIVIDER_ID).first().should("have.css", "border-bottom", BORDER_STYLE);
        cy.get(DROPDOWN_DIVIDER_ID).last().should("not.have.css", "border-bottom", BORDER_STYLE);
    });
});
