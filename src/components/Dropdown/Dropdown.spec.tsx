/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const DROPDOWN_ID = "[data-test-id=dropdown]";
const MENU_ITEM_ID = "[data-test-id=dropdown-menu-item]";

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

const Component = () => {
    {
        const [activeItemId, setActiveItemId] = useState("");
        return (
            <Dropdown
                activeItemId={activeItemId}
                onChange={setActiveItemId}
                menuItems={SMALL_ITEMS}
                placeholder="Select item"
            />
        );
    }
};

describe("Dropdown Component", () => {
    it("renders small items", () => {
        mount(<Component />);

        cy.get(DROPDOWN_ID).contains("Select item");
        cy.get(DROPDOWN_ID).click();
        cy.get(MENU_ITEM_ID).should("have.length", 5);
        cy.get(MENU_ITEM_ID).eq(2).click();
        cy.get(DROPDOWN_ID).contains("Small warning");
    });
});
