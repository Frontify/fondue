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
});
