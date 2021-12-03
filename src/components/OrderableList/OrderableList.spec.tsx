/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { GridNode } from "@react-types/grid";
import { OrderableList, OrderableListItem } from ".";

const LIST_ID = "[data-test-id=orderable-list]";
const LIST_ITEM_ID = "[data-test-id^=orderable-list-item]";
const DRAGGABLE_ITEM = "[data-test-id=draggable-item]";
const INSERTION_INDICATOR = "[data-test-id=insertion-indicator]";

type TestItem = OrderableListItem & {
    text: string;
};

const testItems: TestItem[] = [
    { id: "1", alt: "1", text: "Item 1" },
    { id: "2", alt: "2", text: "Item 2" },
    { id: "3", alt: "3", text: "Item 3" },
    { id: "4", alt: "4", text: "Item 4" },
    { id: "5", alt: "5", text: "Item 5" },
    { id: "6", alt: "6", text: "Item 6" },
];

const renderTestItems = ({ value }: GridNode<TestItem>) => <div>{value.text}</div>;

const OrderableListWithDefaultProps = ({
    renderContent = renderTestItems,
    items = testItems,
    dragDisabled = false,
    onMove = cy.stub(),
}) => <OrderableList renderContent={renderContent} dragDisabled={dragDisabled} items={items} onMove={onMove} />;

describe("OrderableList Component", () => {
    it("renders correct number of list items", () => {
        mount(<OrderableListWithDefaultProps />);
        cy.get(LIST_ID)
            .find(LIST_ITEM_ID)
            .should("have.length", testItems.length)
            .each(($el, index) => {
                cy.wrap($el).should("have.text", testItems[index].text);
            });
    });
    it("Does not crash if item list is empty", () => {
        mount(<OrderableListWithDefaultProps items={[]} />);
        cy.get(LIST_ID).should("exist");
    });
    it("Fires a move event when item is dropped over an insertion indicator", () => {
        const stubbedOnMove = cy.stub().as("onMove");
        const dataTransfer = new DataTransfer();

        mount(<OrderableListWithDefaultProps onMove={stubbedOnMove} />);

        cy.get(DRAGGABLE_ITEM).first().trigger("dragstart", { dataTransfer }).trigger("drag");
        cy.get(LIST_ID)
            .trigger("dragenter", { x: 20, y: 50, dataTransfer })
            .trigger("dragover", { x: 20, y: 50, dataTransfer });
        cy.get(INSERTION_INDICATOR).should("exist").and("have.length", 1);
        cy.get(LIST_ID).trigger("drop", { dataTransfer, force: true });
        cy.get("@onMove").should("have.been.called");
    });
});
