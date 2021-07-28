/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Button, { Size, Style } from "@elements/Button/Button";
import { ReactComponent as Reject } from "@elements/Icon/Svg/Reject.svg";
import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup Composition", () => {
    it("should render a button group with correct spacing for small buttons", () => {
        mount(
            <ButtonGroup>
                <Button size={Size.Small}>The First</Button>
                <Button size={Size.Small} style={Style.Secondary}>
                    The Second
                </Button>
                <Button size={Size.Small} icon={<Reject />} style={Style.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").children().first().should("have.class", "mr-1");
    });

    it("should render a button group with correct spacing for medium buttons", () => {
        mount(
            <ButtonGroup>
                <Button size={Size.Medium}>The First</Button>
                <Button size={Size.Medium} style={Style.Secondary}>
                    The Second
                </Button>
                <Button size={Size.Medium} icon={<Reject />} style={Style.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").children().first().should("have.class", "mr-2");
    });

    it("should render a button group with correct spacing for large buttons", () => {
        mount(
            <ButtonGroup>
                <Button size={Size.Large}>The First</Button>
                <Button size={Size.Large} style={Style.Secondary}>
                    The Second
                </Button>
                <Button size={Size.Large} icon={<Reject />} style={Style.Danger}>
                    The Third
                </Button>
            </ButtonGroup>,
        );

        cy.get("[data-test-id=button-group]").as("ButtonGroup");

        cy.get("@ButtonGroup").children().first().should("have.class", "mr-3");
    });
});
