/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeaderType } from "@components/FieldsetHeader/FieldsetHeader";
import { mount } from "@cypress/react";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { TextInput } from "@components/TextInput/TextInput";
import { TEXT_INPUT_ID } from "@components/TextInput/TextInput.spec";
import React from "react";
import { Accordion, AccordionItem } from "./Accordion";

const ACCORDION_ITEM_ID = "[data-test-id=accordion-item]";
const ACCORDION_ITEM_CONTENT_ID = "[data-test-id=accordion-item-content]";

describe("Accordion Component", () => {
    it("should not render any item", () => {
        mount(
            <Accordion>
                <div data-test-id="invalid-item">Invalid Item</div>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).should("not.exist");
        cy.get("[data-test-id=invalid-item]").should("not.exist");
    });

    it("should render 3 items", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>2</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should("have.length", 3);
    });

    it("should open item 2", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_CONTENT_ID).should("not.exist");
        cy.get(ACCORDION_ITEM_ID).eq(1).click();
        cy.get(ACCORDION_ITEM_CONTENT_ID).should("exist");
    });

    it("should call header action", () => {
        const onClickStub = cy.stub().as("onClickStub");
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1", decorator: <IconIcons />, type: FieldsetHeaderType.Accordion }}>
                    1
                </AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3", type: FieldsetHeaderType.AddRemove, onClick: onClickStub }} />
            </Accordion>,
        );

        cy.get("@onClickStub").should("not.be.called");
        cy.get(ACCORDION_ITEM_ID).eq(2).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("should correctly navigate with keyboard", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>
                    <TextInput />
                </AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>3</AccordionItem>
            </Accordion>,
        );

        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(ACCORDION_ITEM_ID).first().should("be.focused");
        cy.get(TEXT_INPUT_ID).should("not.exist");
        cy.get(ACCORDION_ITEM_ID).first().type("{enter}");
        cy.get(TEXT_INPUT_ID).should("not.be.focused");
        cy.get(ACCORDION_ITEM_ID).first().realPress("Tab");
        cy.get(TEXT_INPUT_ID).should("be.focused");
        cy.get(TEXT_INPUT_ID).realPress("Tab");
        cy.get(TEXT_INPUT_ID).should("not.be.focused");
        cy.get(ACCORDION_ITEM_ID).eq(1).should("be.focused");
        cy.get(ACCORDION_ITEM_ID).eq(1).realPress("Tab");
        cy.get(ACCORDION_ITEM_ID).eq(1).should("not.be.focused");
        cy.get(ACCORDION_ITEM_ID).eq(2).should("be.focused");
    });
});
