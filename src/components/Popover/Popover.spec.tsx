/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Popover, PopoverAlignment, PopoverPosition } from "./Popover";
import { Button, ButtonStyle } from "@components/Button";

const PopoverExample = () => {
    const trigger = <Button style={ButtonStyle.Secondary}>Reference Element</Button>;
    return (
        <Popover
            position={PopoverPosition.Bottom}
            alignment={PopoverAlignment.Start}
            trigger={trigger}
            maxHeight={200}
            maxWidth={200}
        >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto cupiditate dolorem
            saepe sapiente sint suscipit voluptas!
        </Popover>
    );
};

describe("Popover Component", () => {
    it("should render correctly", () => {
        mount(<PopoverExample />);

        cy.get("[data-test-id=popover-trigger]").children().as("Trigger");
        cy.get("@Trigger").click();
        cy.get("[data-test-id=popover-popper]").as("Popover");
        cy.get("@Popover").should("be.visible");
    });
});
