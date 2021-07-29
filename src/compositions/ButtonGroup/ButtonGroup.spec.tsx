/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Button, { Size, Style } from "@elements/Button/Button";
import { ReactComponent as Reject } from "@elements/Icon/Svg/Reject.svg";
import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup Composition", () => {
    it("should render a button group with correct spacing for small buttons", () => {
        mount(
            <ButtonGroup size={Size.Small}>
                <Button>First, Small Button</Button>
                <Button style={Style.Secondary}>The Second, Small Button</Button>
                <Button icon={<Reject />} style={Style.Danger}>
                    And The Third, Small Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "gap-x-1");
    });

    it("should render a button group with correct spacing for medium buttons", () => {
        mount(
            <ButtonGroup size={Size.Medium}>
                <Button>First, Medium Button</Button>
                <Button style={Style.Secondary}>The Second, Medium Button</Button>
                <Button icon={<Reject />} style={Style.Danger}>
                    And The Third, Medium Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "gap-x-2");
    });

    it("should render a button group with correct spacing for large buttons", () => {
        mount(
            <ButtonGroup size={Size.Large}>
                <Button>First, Large Button</Button>
                <Button style={Style.Secondary}>The Second, Large Button</Button>
                <Button icon={<Reject />} style={Style.Danger}>
                    And The Third, Large Button
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").should("have.class", "gap-x-3");
    });

    it("enforces the same size for all buttons according to the group's size", () => {
        mount(
            <ButtonGroup size={Size.Large}>
                <Button size={Size.Small}>The First</Button>
                <Button size={Size.Medium} style={Style.Secondary}>
                    The Second
                </Button>
                <Button size={Size.Large} icon={<Reject />} style={Style.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").children().should("have.class", "h-11");
    });
});
