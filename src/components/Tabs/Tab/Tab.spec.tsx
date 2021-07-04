/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import Tab from "./Tab";

const TAB_CONTENT = "Some text";
const TAB_TITLE = "Some title";

describe("Tab component", () => {
    it("renders", () => {
        mount(<Tab title={TAB_TITLE}>{TAB_CONTENT}</Tab>);

        cy.get("#__cy_root").should("have.html", TAB_CONTENT);
    });
});
