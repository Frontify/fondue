/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import DropdownMenuItem from "./DropdownMenuItem";

const MENU_ITEM_ID = "[data-test-id=dropdown-menu-item]";

const ITEMS = [
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
describe("DropdownMenuItem Component", () => {
    it("should render foo text correctly", () => {
        mount(<DropdownMenuItem {...ITEMS[0]} />);
        cy.get(MENU_ITEM_ID).contains("Small");
    });
});
