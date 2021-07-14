/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Size } from "@utilities/enum";
import { FC, useState } from "react";
import Dropdown from "./Dropdown";
import css from "./Dropdown.module.css";
import { MenuItem } from "./DropdownMenuItem/DropdownMenuItem";
import { MENU_ITEM_TEXT_ID } from "./DropdownMenuItem/DropdownMenuItem.spec";

const DROPDOWN_TRIGGER_ID = "[data-test-id=dropdown-trigger]";

const SMALL_ITEMS = [
    {
        id: "1",
        title: "Small",
    },
    {
        id: "2",
        title: "Small warning",
        warning: true,
    },
    {
        id: "3",
        title: "Small disabled",
        disabled: true,
    },
    {
        id: "4",
        title: "Small warning disabled",
        warning: true,
        disabled: true,
    },
];

const LARGE_ITEMS = [
    {
        id: "5",
        title: "Large",
        subtitle: "Subtitle",
        size: Size.Large,
    },
    {
        id: "6",
        title: "Large warning",
        subtitle: "Subtitle",
        size: Size.Large,
        warning: true,
    },
    {
        id: "7",
        title: "Large disabled",
        subtitle: "Subtitle",
        size: Size.Large,
        disabled: true,
    },
    {
        id: "8",
        title: "Large warning disabled",
        subtitle: "Subtitle",
        size: Size.Large,
        warning: true,
        disabled: true,
    },
];

type Props = {
    items: MenuItem[] | MenuItem[][];
    size: Size;
    placeholder?: string;
    initialActiveId?: string;
};

const Component: FC<Props> = ({ items, size, placeholder = "", initialActiveId = "" }) => {
    const [activeItemId, setActiveItemId] = useState(initialActiveId);
    return (
        <Dropdown
            activeItemId={activeItemId}
            onChange={setActiveItemId}
            menuItems={items}
            placeholder={placeholder}
            size={size}
        />
    );
};

describe("Dropdown Component", () => {
    it("renders with placeholder", () => {
        mount(<Component items={SMALL_ITEMS} size={Size.Small} placeholder="Select item" />);
        cy.get(MENU_ITEM_TEXT_ID).first().contains("Select item");
        cy.get(DROPDOWN_TRIGGER_ID).should("have.class", css.inactive);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_TEXT_ID).should("have.length", 5);
    });
    it("renders with initial active item", () => {
        mount(<Component items={SMALL_ITEMS} size={Size.Small} initialActiveId={SMALL_ITEMS[0].id} />);
        cy.get(MENU_ITEM_TEXT_ID).first().contains("Small");
        cy.get(DROPDOWN_TRIGGER_ID).should("not.have.class", css.inactive);
    });
    it("changes selection on click", () => {
        mount(<Component items={LARGE_ITEMS} size={Size.Large} initialActiveId={LARGE_ITEMS[0].id} />);
        cy.get(DROPDOWN_TRIGGER_ID).should("have.class", css.large);
        cy.get(MENU_ITEM_TEXT_ID).first().contains("Large");
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_TEXT_ID).eq(2).click();
        cy.get(MENU_ITEM_TEXT_ID).first().contains("Large warning");
    });
    it("renders divider", () => {
        mount(<Component items={[SMALL_ITEMS, LARGE_ITEMS]} size={Size.Large} initialActiveId={LARGE_ITEMS[0].id} />);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get("hr").should("have.length", 1);
    });
});
