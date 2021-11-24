/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import React from "react";
import { BlockStyleTypes } from "./renderer/renderBlockStyles";
import { classMap, InlineStyles } from "./renderer/renderInlineStyles";
import { RichTextEditor } from "./RichTextEditor";

const RICH_TEXT_EDITOR = "[data-test-id=rich-text-editor]";
const TOOLBAR = "[data-test-id=toolbar]";

const getBlockStyleControl = (blockType: string) => `[data-test-id=block-style-button-${blockType}]`;
const getInlineStyleControl = (style: string) => `[data-test-id=inline-style-button-${style}]`;
const insertTextAndOpenToolbar = () => cy.get("[contenteditable=true]").click().type("hello{selectall}");

describe("RichTextEditor Component", () => {
    it("should render an empty rich text editor", () => {
        mount(<RichTextEditor />);

        cy.get(RICH_TEXT_EDITOR).should("be.visible");
    });

    it("should render a raw content state", () => {
        const text = "This is some text that you can not edit";
        mount(<RichTextEditor value={JSON.stringify([{ type: BlockStyleTypes.Paragraph, children: [{ text }] }])} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", text);
    });

    it("should render a raw html content state", () => {
        mount(<RichTextEditor value={"<b>this is bold</b> and <i>this italic</i>"} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", "this is bold and this italic");
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Bold]);
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Italic]);
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
        cy.get(getInlineStyleControl(InlineStyles.Bold)).click();
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Bold]);
    });

    it("renders italic", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl(InlineStyles.Italic)).click();
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Italic]);
    });

    it("renders underline", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl(InlineStyles.Underline)).click();
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Underline]);
    });

    it("renders strikethrough", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl(InlineStyles.Strikethrough)).click();
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Strikethrough]);
    });

    it("renders code", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getInlineStyleControl(InlineStyles.Code)).click();
        cy.get("[contenteditable=true]").should("include.html", classMap[InlineStyles.Code]);
    });

    it("renders an ordered list", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(getBlockStyleControl("ordered-list")).click();
        cy.get("[contenteditable=true]").should("include.html", "<ol");
    });

    it("renders an unordered list", () => {
        mount(<RichTextEditor />);

        cy.get("[contenteditable=true]").click().type("hello{selectall}");
        cy.get(getBlockStyleControl("unordered-list")).click();
        cy.get("[contenteditable=true]").should("include.html", "<ul");
    });
});
