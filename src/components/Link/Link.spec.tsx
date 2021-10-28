/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Link } from "./Link";

const Link_FOO = "bar";

describe("Link Component", () => {
    it("should render foo text correctly", () => {
        mount(<Link href="https://example.com" foo={Link_FOO} />);

        cy.get("[data-test-id=link]").as("Link");

        cy.get("@Link").contains(Link_FOO);
    });
});
