/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Tag } from "./Tag";

const Tag_FOO = "bar";

describe("Tag Component", () => {
    it("should render foo text correctly", () => {
        mount(<Tag label={Tag_FOO} />);

        cy.get("[data-test-id=tag]").as("Tag");

        cy.get("@Tag").contains(Tag_FOO);
    });
});
