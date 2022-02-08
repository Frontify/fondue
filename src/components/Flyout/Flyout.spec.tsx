/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FIELDSET_HEADER_ID } from "@components/FieldsetHeader/FieldsetHeader.spec";
import { mount } from "@cypress/react";
import { BADGE_ID } from "@components/Badge/Badge.spec";
import { BUTTON_ID } from "@components/Button/Button.spec";
import { TextInput } from "@components/TextInput/TextInput";
import { TEXT_INPUT_ID } from "@components/TextInput/TextInput.spec";
import React, { FC, useState } from "react";
import { Flyout, FlyoutProps } from "./Flyout";
import { ButtonStyle } from "@components/Button";
import { FlyoutFooter } from "./FlyoutFooter";
import { chain } from "@react-aria/utils";

const FLYOUT_TRIGGER_ID = "[data-test-id=flyout-trigger]";

const Component: FC<Partial<Pick<FlyoutProps, "onClick" | "badges" | "legacyFooter" | "onOpenChange">>> = ({
    onClick,
    onOpenChange,
    badges,
    legacyFooter,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <Flyout
            isOpen={open}
            onOpenChange={chain(onOpenChange, setOpen)}
            trigger="foobar"
            title="Header title"
            badges={badges}
            onClick={onClick}
            legacyFooter={legacyFooter}
        >
            <TextInput placeholder="placeholder" />
            {legacyFooter === false && (
                <FlyoutFooter
                    buttons={[
                        { children: "Cancel", style: ButtonStyle.Secondary, onClick: cy.stub().as("onCloseStub") },
                        { children: "Add", style: ButtonStyle.Primary, onClick: cy.stub().as("onClickStub") },
                    ]}
                />
            )}
        </Flyout>
    );
};

describe("Flyout Component", () => {
    it("should render with header and badges", () => {
        const onOpenChanged = cy.stub().as("onOpenChanged");

        mount(<Component badges={[{ children: "Badge 1" }, { children: "Badge 2" }]} onOpenChange={onOpenChanged} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(FIELDSET_HEADER_ID).should("contain", "Header title");
        cy.get(BADGE_ID).should("have.length", 2);
        cy.get(TEXT_INPUT_ID).should("have.attr", "placeholder").and("eq", "placeholder");
        cy.get(BUTTON_ID).click();
        cy.get("@onOpenChanged").should("be.calledTwice");
    });
    it("should render with onClick action", () => {
        const onOpenChanged = cy.stub().as("onOpenChanged");
        const onClickStub = cy.stub().as("onClickStub");

        mount(<Component onClick={onClickStub} onOpenChange={onOpenChanged} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(BUTTON_ID).should("have.length", 2);
        cy.get(BUTTON_ID).eq(1).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
    it("should render with custom footer buttons", () => {
        mount(<Component legacyFooter={false} />);

        cy.get(FLYOUT_TRIGGER_ID).click();
        cy.get(BUTTON_ID).should("have.length", 2);
        cy.get(BUTTON_ID).eq(0).click();
        cy.get("@onCloseStub").should("be.calledOnce");
        cy.get(BUTTON_ID).eq(1).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });
});
