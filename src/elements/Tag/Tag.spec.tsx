/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Tag, TagType } from "./Tag";

const TAG_ID = "[data-test-id=tag]";
const TAG_LABEL = "My awesome tag";
const TAG_REJECT_ICON_ATTRIBUTE = "svg[name=IconReject]";

describe("Tag Component", () => {
    it("should render a label", () => {
        mount(<Tag type={TagType.Suggested} label={TAG_LABEL} />);

        cy.get(TAG_ID).contains(TAG_LABEL);
    });

    it("should render a suggested tag", () => {
        mount(<Tag type={TagType.Suggested} label={TAG_LABEL} />);

        cy.get(TAG_ID).should("have.class", "tw-bg-white").and("have.class", "tw-text-black-80");
        cy.get(TAG_REJECT_ICON_ATTRIBUTE).should("not.exist");
    });

    it("should render a selected tag", () => {
        mount(<Tag type={TagType.Selected} label={TAG_LABEL} />);

        cy.get(TAG_ID).should("have.class", "tw-bg-black-5");
        cy.get(TAG_ID).should("be.visible", TAG_REJECT_ICON_ATTRIBUTE);
    });

    it("should render a selected with focus tag", () => {
        mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} />);

        cy.get(TAG_ID).should("have.class", "tw-bg-violet-60");
        cy.get(TAG_ID).should("be.visible", TAG_REJECT_ICON_ATTRIBUTE);
    });

    it("should render a previously selected tag", () => {
        mount(<Tag type={TagType.PreviouslySelected} label={TAG_LABEL} />);

        cy.get(TAG_ID).should("have.class", "tw-bg-white").and("have.class", "tw-text-violet-60");
        cy.get(TAG_REJECT_ICON_ATTRIBUTE).should("not.exist");
    });

    it("should trigger a click event on click when type is selected", () => {
        const onClickStub = cy.stub().as("onClickStub");

        mount(<Tag type={TagType.Selected} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get("@onClickStub").should("not.be.called");
        cy.get(TAG_ID).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("should trigger a click event on click when type is selected with focus", () => {
        const onClickStub = cy.stub().as("onClickStub");

        mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} onClick={onClickStub} />);

        cy.get("@onClickStub").should("not.be.called");
        cy.get(TAG_ID).click();
        cy.get("@onClickStub").should("be.calledOnce");
    });

    it("should be able to gain focus on keyboard tab press", () => {
        mount(<Tag type={TagType.SelectedWithFocus} label={TAG_LABEL} />);

        cy.window().focus();
        cy.get("body").realPress("Tab");
        cy.get(TAG_ID).should("be.focused");
    });
});
