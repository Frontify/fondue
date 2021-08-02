/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Type } from "@compositions/FieldsetHeader/FieldsetHeader";
import { mount } from "@cypress/react";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Accordion, AccordionItem } from "./Accordion";

const ACCORDION_ITEM_ID = "[data-test-id=accordion-item]";
const ACCORDION_ITEM_CONTENT_ID = "[data-test-id=accordion-item-content]";

describe("Accordion Component", () => {
    it("should not render any item", () => {
        mount(
            <Accordion>
                <div data-test-id="invalid-item">Invalid Item</div>
            </Accordion>,
            { cssFile: "./dist/styles.css" },
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).should("not.exist");
    });

    it("should render 3 items", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>2</AccordionItem>
            </Accordion>,
            { cssFile: "./dist/styles.css" },
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).should("have.length", 3);
    });

    it("should open item 2", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>2</AccordionItem>
            </Accordion>,
            { cssFile: "./dist/styles.css" },
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).eq(1).should("not.be.visible");
        cy.get(ACCORDION_ITEM_ID).eq(1).click();
        cy.get(ACCORDION_ITEM_CONTENT_ID).eq(1).should("be.visible");
    });

    it("should call header action", () => {
        const onClickStub = cy.stub().as("onClickStub");
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1", decorator: <IconIcons />, type: Type.Accordion }}>
                    1
                </AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3", type: Type.AddRemove, onClick: onClickStub }} />
            </Accordion>,
            { cssFile: "./dist/styles.css" },
        );

        cy.get("@onClickStub").should("not.be.called");
        cy.get(ACCORDION_ITEM_ID).eq(2).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
});
