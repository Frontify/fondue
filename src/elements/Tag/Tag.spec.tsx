/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Tag, TagType } from "./Tag";

const TAG_ID = "[data-test-id=tag]";
const TAG_LABEL = "My awesome tag";

describe("Tag Component", () => {
    it("should render a label", () => {
        mount(<Tag type={TagType.Suggested} label={TAG_LABEL} />);

        cy.get(TAG_ID).contains(TAG_LABEL);
    });
});
