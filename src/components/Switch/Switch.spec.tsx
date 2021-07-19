/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { useState } from "react";
import { FC } from "react";
import { Size } from "@utilities/enum";

import Switch, { SwitchProps } from "./Switch";
import css from "./Switch.module.css";

const Component: FC<SwitchProps> = ({ on = false, ...props }) => {
    const [active, setActive] = useState(on);

    return <Switch {...props} on={active} onChange={() => setActive(!active)} />;
};

describe("Switch Component", () => {
    it("should render the value correctly", () => {
        mount(<Component name="switch-test-value" />);

        cy.get("[data-test-id=Switch]").as("Switch");
        cy.get("@Switch").invoke("attr", "name").should("eq", "switch-test-value");
        cy.get("@Switch").should("have.value", "false");

        cy.get("@Switch").click();
        cy.get("@Switch").should("have.value", "true");
    });

    it("should do nothing if disabled", () => {
        mount(<Component name="switch-test-disabled" disabled />);

        cy.get("[data-test-id=Switch]").as("Switch");
        cy.get("@Switch").invoke("attr", "name").should("eq", "switch-test-disabled");
        cy.get("@Switch").invoke("attr", "disabled").should("eq", "disabled");
    });

    it("can be rendered as large", () => {
        mount(<Component name="switch-test-disabled" size={Size.Large} />);

        cy.get("[data-test-id=Switch]").as("Switch");
        cy.get("@Switch").should("have.class", css.large);
    });
});
