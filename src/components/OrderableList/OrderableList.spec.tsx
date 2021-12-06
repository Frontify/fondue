/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { GridNode } from "@react-types/grid";
import { DragProperties, ItemDragState, OrderableList, OrderableListContainerProps, OrderableListItem } from ".";

const LIST_ID = "[data-test-id=orderable-list]";
const LIST_ITEM_ID = "[data-test-id=orderable-list-item]";
const DRAGGABLE_ITEM = "[data-test-id=draggable-item]";
const INSERTION_INDICATOR = "[data-test-id=insertion-indicator]";
const VISUAL_INSERTION_INDICATOR = "[data-test-id=visual-insertion-indicator]";
const DROP_TARGET = "[data-drop-target=true]";

const FOCUSABLE_ITEM = "[data-test-id=focusable-item]";
const ITEM_HEIGHT = 20;

type TestItem = {
    text: string;
};

const testItems: OrderableListItem<TestItem>[] = [
    { id: "1", alt: "1", text: "Item 1" },
    { id: "2", alt: "2", text: "Item 2" },
    { id: "3", alt: "3", text: "Item 3" },
    { id: "4", alt: "4", text: "Item 4" },
    { id: "5", alt: "5", text: "Item 5" },
    { id: "6", alt: "6", text: "Item 6" },
];

const renderDefaultTestItems = ({ value }: GridNode<OrderableListItem<TestItem>>) => (
    <div style={{ height: `${ITEM_HEIGHT}px` }}>{value.text}</div>
);

const renderWithFocusableItems = (_item: GridNode<TestItem>, { isFocusVisible }: DragProperties) => (
    <div
        style={{ height: `${ITEM_HEIGHT}px`, display: "flex", justifyContent: "space-around" }}
        data-focus-visible={isFocusVisible}
    >
        <button data-test-id="focusable-item">Button</button>
        <input data-test-id="focusable-item" value="Input"></input>
        <textarea data-test-id="focusable-item">Textarea</textarea>
    </div>
);

const getCoordinatesByIndex = (index: number, position: "Before" | "After") => {
    let y = -15;
    y += (index + 1) * ITEM_HEIGHT;
    if (position === "After") {
        y += 10;
    }
    return { x: 20, y };
};

const OrderableListWithDefaultProps = ({
    renderContent = renderDefaultTestItems,
    items = testItems,
    dragDisabled = false,
    onMove = cy.stub(),
}: Partial<OrderableListContainerProps>) => (
    <OrderableList renderContent={renderContent} dragDisabled={dragDisabled} items={items} onMove={onMove} />
);

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
            .trigger("dragenter", { ...getCoordinatesByIndex(4, "Before"), dataTransfer })
            .trigger("dragover", { ...getCoordinatesByIndex(4, "Before"), dataTransfer });
        cy.get(INSERTION_INDICATOR).should("exist").and("have.length", 1);
        cy.get(LIST_ID).trigger("drop", { dataTransfer, force: true });
        cy.get("@onMove").should("have.been.called");
    });

    it("Hides insertion indicator if position change is original index", () => {
        mount(<OrderableListWithDefaultProps />);

        cy.get(DRAGGABLE_ITEM).each(($el, index) => {
            const dataTransfer = new DataTransfer();
            cy.wrap($el).trigger("dragstart", { dataTransfer }).trigger("drag");
            cy.get(LIST_ID)
                .trigger("dragenter", { ...getCoordinatesByIndex(index, "Before"), dataTransfer })
                .trigger("dragover", { ...getCoordinatesByIndex(index, "Before"), dataTransfer });
            cy.get(INSERTION_INDICATOR).should("have.length", 0);
            cy.get(LIST_ID)
                .trigger("dragenter", { ...getCoordinatesByIndex(index, "After"), dataTransfer })
                .trigger("dragover", { ...getCoordinatesByIndex(index, "After"), dataTransfer });
            cy.get(INSERTION_INDICATOR).should("have.length", 0);
        });
    });

    it("Passes on correct drag state to each item", () => {
        const renderWithDragState = (_item: GridNode<TestItem>, { componentDragState }: DragProperties) => (
            <div style={{ height: `${ITEM_HEIGHT}px` }}>{componentDragState}</div>
        );

        mount(<OrderableListWithDefaultProps renderContent={renderWithDragState} />);

        cy.get(DRAGGABLE_ITEM).each(($el, index, $list) => {
            const dataTransfer = new DataTransfer();
            const dropIndex = index + 2 > $list.length ? index - 2 : index + 1;
            cy.wrap($el).should("have.text", ItemDragState.Idle).trigger("dragstart", { dataTransfer }).trigger("drag");
            cy.wrap($el).should("have.text", ItemDragState.Dragging);
            cy.get(LIST_ID)
                .trigger("dragenter", { ...getCoordinatesByIndex(dropIndex, "After"), dataTransfer })
                .trigger("dragover", { ...getCoordinatesByIndex(dropIndex, "After"), dataTransfer });
            cy.get(INSERTION_INDICATOR).should("exist").and("have.length", 1);
            cy.get(LIST_ID).trigger("drop", { dataTransfer, force: true });
            cy.wrap($el).trigger("dragend", { dataTransfer, force: true });
            cy.wrap($el).should("have.text", ItemDragState.Idle);
        });
    });

    it.only("Has keyboard accessibility", () => {
        const stubbedOnMove = cy.stub().as("onMove");

        mount(<OrderableListWithDefaultProps renderContent={renderWithFocusableItems} onMove={stubbedOnMove} />);
        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(DRAGGABLE_ITEM).first().should("be.focused").children("[data-focus-visible=true]").should("exist");
        cy.get(DRAGGABLE_ITEM).first().trigger("keydown", { key: "ArrowDown" });
        cy.get(DRAGGABLE_ITEM).first().should("not.be.focused").children("[data-focus-visible=false]").should("exist");
        cy.get(DRAGGABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).trigger("keydown", { key: "ArrowDown" });
        cy.get(DRAGGABLE_ITEM).eq(1).should("not.be.focused");
        cy.get(DRAGGABLE_ITEM).eq(2).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(2).trigger("keydown", { key: "ArrowUp" });
        cy.get(DRAGGABLE_ITEM).eq(2).should("not.be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).trigger("keydown", { key: "ArrowRight" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).first().should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).first().trigger("keydown", { key: "ArrowRight" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(1).trigger("keydown", { key: "ArrowRight" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(2).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(2).trigger("keydown", { key: "ArrowRight" });
        cy.get(DRAGGABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).trigger("keydown", { key: "ArrowLeft" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(2).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(2).trigger("keydown", { key: "ArrowLeft" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).eq(1).trigger("keydown", { key: "ArrowLeft" });
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).first().should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).find(FOCUSABLE_ITEM).first().trigger("keydown", { key: "ArrowLeft" });
        cy.get(DRAGGABLE_ITEM).eq(1).should("be.focused");
        cy.get(DRAGGABLE_ITEM).eq(1).realPress("Space");
        cy.get(VISUAL_INSERTION_INDICATOR).should("have.length", testItems.length - 1);
        cy.get(DRAGGABLE_ITEM).eq(1).realPress("Escape");
        cy.get(VISUAL_INSERTION_INDICATOR).should("have.length", 0);
        cy.get(DRAGGABLE_ITEM).eq(1).realPress("Space");
        cy.get(VISUAL_INSERTION_INDICATOR)
            .should("have.length", testItems.length - 1)
            .filter(DROP_TARGET)
            .should("have.length", 1)
            .children(INSERTION_INDICATOR)
            .realPress("Enter");
        cy.get("@onMove").should("have.been.called");
    });

    it("Should disable drag events if dragDisabled prop is true, but maintain focus for navigation", () => {
        mount(<OrderableListWithDefaultProps dragDisabled={true} renderContent={renderWithFocusableItems} />);
        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(DRAGGABLE_ITEM).each(($el) => {
            cy.wrap($el).should("be.focused");

            const draggable = $el.attr("draggable");
            expect(draggable).to.be.undefined;

            cy.wrap($el).realPress("Space");
            cy.get(VISUAL_INSERTION_INDICATOR).should("have.length", 0);
            cy.wrap($el).trigger("keydown", { key: "ArrowRight" });
            cy.wrap($el).find(FOCUSABLE_ITEM).first().should("be.focused").trigger("keydown", { key: "ArrowLeft" });
            cy.wrap($el).trigger("keydown", { key: "ArrowDown" });
        });
    });
});
