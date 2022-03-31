/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from "react";
import { Button } from "@components/Button";
import { CollapsibleWrap as CollapsibleWrapComponent } from "./CollapsibleWrap";
import { mount } from "@cypress/react";

const CONTENT_ID = '[data-test-id="collapsible-wrap-content"]';
const BUTTON_ID = '[data-test-id="button"]';

const CollapsibleWrap: FC<{ preventInitialAnimation?: boolean; isOpen?: boolean }> = ({
    preventInitialAnimation = false,
    isOpen: externalIsOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(externalIsOpen);
    return (
        <>
            <CollapsibleWrapComponent isOpen={isOpen} preventInitialAnimation={preventInitialAnimation}>
                <div style={{ height: "100px" }} data-test-id="collapsible-wrap-content">
                    Content
                </div>
            </CollapsibleWrapComponent>
            <Button onClick={() => setIsOpen((open) => !open)}>Click To Toggle Open</Button>
        </>
    );
};

describe("CollapsibleWrap", () => {
    it("renders without crashing", () => {
        mount(<CollapsibleWrap />);
        cy.get(CONTENT_ID).should("exist");
    });

    it("renders without content visible", () => {
        mount(<CollapsibleWrap />);
        cy.get(CONTENT_ID).should("not.exist");
        cy.get(BUTTON_ID).click();
        cy.get(CONTENT_ID).should("be.visible");
        cy.get(BUTTON_ID).click();
        cy.get(CONTENT_ID).should("not.exist");
    });

    it("renders with content visible and no animation", () => {
        mount(<CollapsibleWrap preventInitialAnimation={true} isOpen={true} />);
        cy.get(CONTENT_ID).should("be.visible");
        cy.get(BUTTON_ID).click();
        cy.get(CONTENT_ID).should("not.exist");
    });
});
