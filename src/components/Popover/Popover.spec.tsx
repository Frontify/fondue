/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { PopoverComponent, PopoverAlignment, PopoverPosition } from "./Popover";
import { Button, ButtonStyle } from "@components/Button";

const PopoverExample = () => {
    const trigger = <Button style={ButtonStyle.Secondary}>Reference Element</Button>;
    return (
        <PopoverComponent position={PopoverPosition.Bottom} alignment={PopoverAlignment.Start} trigger={trigger}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto cupiditate dolorem
            saepe sapiente sint suscipit voluptas!
        </PopoverComponent>
    );
};

describe("Popover Component", () => {
    it("should render foo text correctly", () => {
        mount(PopoverExample);

        cy.get("[data-test-id=popover]").as("Popover");

        cy.get("@Popover").should("be.visible");
    });
});
