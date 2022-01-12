/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { Button, ButtonSize, ButtonStyle } from "@components/Button/Button";
import IconReject from "@components/Icon/Generated/IconReject";
import React from "react";
import { ButtonGroup } from "./ButtonGroup";

describe("ButtonGroup Composition", () => {
    it("should render a button group with correct spacing for small buttons", () => {
        mount(
            <ButtonGroup size={ButtonSize.Small}>
                <Button>First, Small Button</Button>
                <Button style={ButtonStyle.Secondary}>The Second, Small Button</Button>
                <Button icon={<IconReject />} style={ButtonStyle.Danger}>
                    And The Third, Small Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "tw-gap-x-1");
    });

    it("should render a button group with correct spacing for medium buttons", () => {
        mount(
            <ButtonGroup size={ButtonSize.Medium}>
                <Button>First, Medium Button</Button>
                <Button style={ButtonStyle.Secondary}>The Second, Medium Button</Button>
                <Button icon={<IconReject />} style={ButtonStyle.Danger}>
                    And The Third, Medium Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "tw-gap-x-2");
    });

    it("should render a button group with correct spacing for large buttons", () => {
        mount(
            <ButtonGroup size={ButtonSize.Large}>
                <Button>First, Large Button</Button>
                <Button style={ButtonStyle.Secondary}>The Second, Large Button</Button>
                <Button icon={<IconReject />} style={ButtonStyle.Danger}>
                    And The Third, Large Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "tw-gap-x-3");
    });

    it("enforces the same size for all buttons according to the group's size", () => {
        mount(
            <ButtonGroup size={ButtonSize.Large}>
                <Button size={ButtonSize.Small}>The First</Button>
                <Button size={ButtonSize.Medium} style={ButtonStyle.Secondary}>
                    The Second
                </Button>
                <Button size={ButtonSize.Large} icon={<IconReject />} style={ButtonStyle.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").children().should("have.class", "tw-h-12");
    });
});
