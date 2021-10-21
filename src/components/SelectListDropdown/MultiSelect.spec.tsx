/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React, { FC, useState } from "react";
import { MultiSelect } from "./MultiSelect";

const TRIGGER_ID = "[data-test-id=trigger]";
const SELECTED_LIST_ID = "[data-test-id=select-list-selected]";
const SELECT_LIST_ID = "[data-test-id=select-list]";
const SELECT_ITEM_ID = "[data-test-id=select-item]";

const ITEMS = {
    activeItemKeys: ["Short tag", "Tag 74"],
    items: [
        {
            name: "Checkbox label 1",
        },
        {
            name: "Short tag",
        },
        {
            name: "Checkbox label 2",
        },
        {
            name: "Checkbox label 3",
        },
        {
            name: "Tag 74",
        },
        {
            name: "This is a long tag",
        },
    ],
};

const Component: FC = () => {
    const [activeItems, setActiveItems] = useState<(string | number)[]>(ITEMS.activeItemKeys);
    return (
        <MultiSelect
            items={ITEMS.items}
            activeItemKeys={activeItems}
            onSelectionChange={(keys) => setActiveItems(keys)}
        />
    );
};

describe("MultiSelect Component", () => {
    it("renders with initial active items", () => {
        mount(<Component />);
        cy.get(SELECTED_LIST_ID).should("contain", "Short tag").and("contain", "Tag 74");
    });
    it("opens dropdown select list on click", () => {
        mount(<Component />);
        cy.get(TRIGGER_ID).click();
        cy.get(SELECT_LIST_ID).should("be.visible");
    });
    it("changes selection on click", () => {
        mount(<Component />);
        cy.get(TRIGGER_ID).click();
        cy.get(SELECT_ITEM_ID).first().as("firstListItem");
        cy.get(SELECT_ITEM_ID).eq(1).as("secondListItem");
        cy.get(SELECT_ITEM_ID).eq(2).as("thirdListItem");

        cy.get("@firstListItem").click();
        cy.get("@firstListItem").should("have.attr", "aria-selected", "true");
        cy.get(SELECTED_LIST_ID).contains("Checkbox label 1");

        cy.get("@secondListItem").click();
        cy.get("@secondListItem").should("have.attr", "aria-selected", "false");
        cy.get(SELECTED_LIST_ID).contains("Short tag").should("not.exist");

        cy.get("@thirdListItem").click();
        cy.get("@thirdListItem").should("have.attr", "aria-selected", "true");
        cy.get(SELECTED_LIST_ID).contains("Checkbox label 2");
    });
});
