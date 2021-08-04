/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from "react";
import { mount } from "@cypress/react";
import { Switch, SwitchProps } from "./Switch";

const Component: FC<SwitchProps> = ({ on = false, ...props }) => {
    const [active, setActive] = useState(on);

    return (
        <Switch
            {...props}
            on={active}
            onChange={(event) => {
                setActive(!active);
                props.onChange && props.onChange(event);
            }}
        />
    );
};

const SWITCH_ID = "[data-test-id=switch]";

describe("Switch Component", () => {
    it("should render the value correctly", () => {
        mount(<Component name="switch-test-value" />);

        cy.get(SWITCH_ID).as("Switch");
        cy.get("@Switch").invoke("attr", "name").should("eq", "switch-test-value");
        cy.get("@Switch").should("have.value", "false");

        cy.get("@Switch").click();
        cy.get("@Switch").should("have.value", "true");
    });

    it("should react on click", () => {
        const onChangeStub = cy.stub().as("onChangeStub");

        mount(<Component name="switch-test-change" onChange={onChangeStub} />);
        cy.get("@onChangeStub").should("not.be.called");

        cy.get(SWITCH_ID).as("Switch");
        cy.get("@Switch").click();
        cy.get("@onChangeStub").should("be.calledOnce");
    });

    it("should do nothing if disabled", () => {
        mount(<Component name="switch-test-disabled" disabled />);

        cy.get(SWITCH_ID).as("Switch");
        cy.get("@Switch").invoke("attr", "name").should("eq", "switch-test-disabled");
        cy.get("@Switch").invoke("attr", "disabled").should("eq", "disabled");
    });
});
