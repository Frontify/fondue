/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { ContentState, convertToRaw } from "draft-js";
import React from "react";
import { RichTextEditor } from "./RichTextEditor";
import { styleMap } from "./styleMap";

const RICH_TEXT_EDITOR = "[data-test-id=rich-text-editor]";
const TOOLBAR = "[data-test-id=toolbar]";

const getBlockStyleControl = (blockType: string) => `[data-test-id=block-style-button-${blockType}]`;
const getInlineStyleControl = (style: string) => `[data-test-id=inline-style-button-${style}]`;
const insertTextAndOpenToolbar = () => cy.get("[contenteditable=true]").click().type("hello{selectall}");

const camelToUnderscore = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.split(" ").join("-").toLowerCase();
};

const getStringifiedStyles = (styleObject: { [key: string]: string }) =>
    Object.entries(styleObject)
        .reduce<string[]>((acc, [key, value]) => {
            acc.push(`${camelToUnderscore(key)}: ${value}`);
            return acc;
        }, [])
        .join("; ");

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

    it("should type and insert text", () => {
        mount(<RichTextEditor />);

        cy.get("[contenteditable=true]").click().type("hello");
    });

    it("should display toolbar when selecting inserted text", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR).should("exist");
    });

    it("should close toolbar on blur", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get("[contenteditable=true]").blur();
        cy.get(TOOLBAR).should("not.exist");
    });

    it("renders a bold text", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("BOLD")).click();
        cy.get("[contenteditable=true]").should("include.html", "font-weight: bold");
    });

    it("renders code", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("CODE")).click();
        cy.get("[contenteditable=true]").should("include.html", getStringifiedStyles(styleMap.CODE));
    });

    it("renders italic", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("ITALIC")).click();
        cy.get("[contenteditable=true]").should("include.html", "font-style: italic");
    });

    it("renders underline", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("UNDERLINE")).click();
        cy.get("[contenteditable=true]").should("include.html", "text-decoration: underline");
    });

    it("renders subscript", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("SUBSCRIPT")).click();
        cy.get("[contenteditable=true]").should("include.html", getStringifiedStyles(styleMap.SUBSCRIPT));
    });

    it("renders superscript", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("SUPERSCRIPT")).click();
        cy.get("[contenteditable=true]").should("include.html", getStringifiedStyles(styleMap.SUPERSCRIPT));
    });

    it("renders strikethrough", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl("STRIKETHROUGH")).click();
        cy.get("[contenteditable=true]").should("include.html", getStringifiedStyles(styleMap.STRIKETHROUGH));
    });

    it("renders an ordered list", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getBlockStyleControl("ordered-list-item")).click();
        cy.get("[contenteditable=true]").should("include.html", "<ol");
    });

    it("renders an unordered list", () => {
        mount(<RichTextEditor />);

        cy.get("[contenteditable=true]").click().type("hello{selectall}");
        cy.get(getBlockStyleControl("unordered-list-item")).click();
        cy.get("[contenteditable=true]").should("include.html", "<ul");
    });
});
