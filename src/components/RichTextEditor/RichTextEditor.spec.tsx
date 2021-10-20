/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { ContentState, convertToRaw } from "draft-js";
import React from "react";
import { RichTextEditor } from "./RichTextEditor";

const RICH_TEXT_EDITOR = "[data-test-id=rich-text-editor]";

describe("RichTextEditor Component", () => {
    it("should render an empty rich text editor", () => {
        mount(<RichTextEditor />);

        cy.get(RICH_TEXT_EDITOR).should("be.visible");
    });

    it("should render a rich text editor with some predefined text", () => {
        const text = "This is some text that you can not edit";
        mount(<RichTextEditor value={convertToRaw(ContentState.createFromText(text))} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", text);
    });

    it("should be editable by default ", () => {
        mount(<RichTextEditor />);

        cy.get("[contenteditable=true]").should("exist");
    });

    it("should not the able to edit when readonly ", () => {
        mount(<RichTextEditor readonly />);

        cy.get("[contenteditable=false]").should("exist");
    });
});
