/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { TextInput } from "@components/TextInput/TextInput";
import React, { FC } from "react";
import { Accordion, AccordionItem } from "./Accordion";
import { AccordionHeaderProps } from ".";

const ACCORDION_ITEM_ID = "[data-test-id=accordion-item]";
const ACCORDION_ITEM_CONTENT_ID = '[data-test-id="collapsible-wrap"]';
const TEXT_INPUT_ID = "[data-test-id=text-input]";
const TEST_HEADER_ID = '[data-test-id="test-header"]';
const ACCORDION_ID = "[data-test-id=accordion]";

const itemClasses = ["tw-divide-y tw-divide-black-10"];
const accordionClasses = ["tw-border-b", "tw-border-t", "tw-border-black-10", ...itemClasses];

const TestHeader: FC<AccordionHeaderProps> = ({ isOpen, disabled, children }) => (
    <div data-test-id="test-header" data-state={isOpen ? "open" : "closed"} data-disabled={disabled}>
        {children}
    </div>
);

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
                <AccordionItem header={{ children: "1", decorator: <IconIcons /> }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3", onClick: onClickStub }} />
            </Accordion>,
        );

        cy.get("@onClickStub").should("not.be.called");
        cy.get(ACCORDION_ITEM_ID).eq(2).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("should not have any open section by defaut", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2" }}>2</AccordionItem>
                <AccordionItem header={{ children: "3" }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should("have.length", 3);
        cy.get(ACCORDION_ITEM_CONTENT_ID).should("have.length", 0);
    });

    it("allows multiple sections to be open by default", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
                <AccordionItem header={{ children: "2", active: true }}>2</AccordionItem>
                <AccordionItem header={{ children: "3", active: true }}>3</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ITEM_ID).should("have.length", 3);
        cy.get(ACCORDION_ITEM_CONTENT_ID).should("have.length", 2);
        cy.get(ACCORDION_ITEM_ID).eq(0).siblings(ACCORDION_ITEM_CONTENT_ID).should("not.exist");
        cy.get(ACCORDION_ITEM_ID).eq(1).siblings(ACCORDION_ITEM_CONTENT_ID).should("exist");
        cy.get(ACCORDION_ITEM_ID).eq(2).siblings(ACCORDION_ITEM_CONTENT_ID).should("exist");
    });

    it("renders a custom header component", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }} headerComponent={TestHeader}>
                    1
                </AccordionItem>
                <AccordionItem header={{ children: "2", disabled: true }} headerComponent={TestHeader}>
                    2
                </AccordionItem>
                <AccordionItem header={{ children: "3", active: true }} headerComponent={TestHeader}>
                    3
                </AccordionItem>
            </Accordion>,
        );

        cy.get(TEST_HEADER_ID).should("have.length", 3);
        cy.get(TEST_HEADER_ID).first().should("have.text", "1");
        cy.get(TEST_HEADER_ID).eq(1).invoke("data", "disabled").should("be.true");
        cy.get(TEST_HEADER_ID).eq(2).invoke("data", "state").should("equal", "open");
    });

    it("shows border and divider on the Accordion", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }} divider={true}>
                    1
                </AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ID).should("have.length", 1);
        cy.wrap(accordionClasses).each(($class) => {
            cy.get(ACCORDION_ID).should("have.class", $class);
        });
        cy.wrap(itemClasses).each(($class) => {
            cy.get(ACCORDION_ITEM_ID).parent().should("have.class", $class);
        });
    });

    it("hides border and divider", () => {
        mount(
            <Accordion border={false} divider={false}>
                <AccordionItem header={{ children: "1" }}>1</AccordionItem>
            </Accordion>,
        );

        cy.get(ACCORDION_ID).should("have.length", 1);
        cy.wrap(itemClasses).each(($class) => {
            cy.get(ACCORDION_ITEM_ID).parent().should("not.have.class", $class);
        });
        cy.wrap(accordionClasses).each(($class) => {
            cy.get(ACCORDION_ID).should("not.have.class", $class);
        });
    });

    it("should correctly navigate with keyboard", () => {
        mount(
            <Accordion>
                <AccordionItem header={{ children: "1" }}>
                    <TextInput />
                </AccordionItem>
                <AccordionItem header={{ children: "2" }}>
                    <TextInput />
                </AccordionItem>
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
        cy.get(ACCORDION_ITEM_ID).eq(1).type("{enter}");
        cy.get(ACCORDION_ITEM_ID).eq(1).realPress("Tab");
        cy.get(TEXT_INPUT_ID).eq(1).should("be.focused");
        cy.get(TEXT_INPUT_ID).eq(1).realPress("ArrowDown");
        cy.get(TEXT_INPUT_ID).eq(1).should("be.focused");
        cy.get(TEXT_INPUT_ID).eq(1).realPress("Tab");
        cy.get(ACCORDION_ITEM_ID).eq(1).should("not.be.focused");
        cy.get(ACCORDION_ITEM_ID).eq(2).should("be.focused");
        cy.get(ACCORDION_ITEM_ID).eq(2).realPress("ArrowUp");
        cy.get(ACCORDION_ITEM_ID).eq(1).should("be.focused");
    });
});
