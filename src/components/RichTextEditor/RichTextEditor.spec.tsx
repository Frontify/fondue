/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from "@cypress/react";
import { ELEMENT_PARAGRAPH } from "@udecode/plate";
import React, { FC, useState } from "react";
import { ON_SAVE_DELAY_IN_MS, RichTextEditor, RichTextEditorProps } from "./RichTextEditor";

const RICH_TEXT_EDITOR = "[data-test-id=rich-text-editor]";
const TOOLBAR = "[data-test-id=toolbar]";
const TEXT_ALIGNMENT_BUTTONS = "[data-test-id=text-alignment-buttons]";
const TEXT_MARK_BUTTONS = "[data-test-id=text-mark-buttons]";
const TEXT_ELEMENT_BUTTONS = "[data-test-id=text-element-buttons]";
const TEXTSTYLE_DROPDOWN_TRIGGER = "[data-test-id=textstyle-dropdown-trigger]";
const TEXTSTYLE_OPTION = "[data-test-id=textstyle-option]";

const insertTextAndOpenToolbar = () => cy.get("[contenteditable=true]").click().type("hello{selectall}");

const RichTextWithClearButton: FC<Pick<RichTextEditorProps, "value">> = ({ value }) => {
    const [clear, setClear] = useState(false);
    return (
        <div>
            <button data-test-id="clear-button" onClick={() => setClear(true)}>
                clear
            </button>
            <RichTextEditor value={value} clear={clear} />
        </div>
    );
};

describe("RichTextEditor Component", () => {
    it("should render an empty rich text editor", () => {
        mount(<RichTextEditor />);

        cy.get(RICH_TEXT_EDITOR).should("be.visible");
    });

    it("should render a raw content state", () => {
        const text = "This is some text that you can not edit";
        mount(<RichTextEditor value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", text);
    });

    it("should render a raw html content state", () => {
        mount(<RichTextEditor value={"<b>this is bold</b> and <i>this italic</i>"} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", "this is bold and this italic");
        cy.get("[contenteditable=true]").should("include.html", "tw-font-bold");
        cy.get("[contenteditable=true]").should("include.html", "tw-italic");
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

    // it("should close toolbar on blur", () => {
    //     mount(<RichTextEditor />);

    //     insertTextAndOpenToolbar();
    //     cy.get("[contenteditable=true]").blur();
    //     cy.get(TOOLBAR).should("not.be.visible");
    // });

    it("renders a bold text", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS).children().eq(0).click();
        cy.get("[contenteditable=true]").should("include.html", "tw-font-bold");
    });

    it("renders italic", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS).children().eq(1).click();
        cy.get("[contenteditable=true]").should("include.html", "tw-italic");
    });

    it("renders underline", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS).children().eq(2).click();
        cy.get("[contenteditable=true]").should("include.html", "tw-underline");
    });

    it("renders strikethrough", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS).children().eq(3).click();
        cy.get("[contenteditable=true]").should("include.html", "tw-line-through");
    });

    it("renders code", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS).children().eq(4).click();
        cy.get("[contenteditable=true]").should(
            "include.html",
            "tw-table-cell tw-rounded tw-text-xs tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-0.5",
        );
    });

    it("renders an unordered list", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_ELEMENT_BUTTONS).children().eq(1).click();
        cy.get("[contenteditable=true]").should("include.html", "<ul");
    });

    it("renders an ordered list", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_ELEMENT_BUTTONS).children().eq(2).click();
        cy.get("[contenteditable=true]").should("include.html", "<ol");
    });

    it("renders a right aligned text", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_ALIGNMENT_BUTTONS).children().eq(2).click();
        cy.get("[contenteditable=true]").should("include.html", "text-align: right");
    });

    it("renders headings", () => {
        mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TEXTSTYLE_DROPDOWN_TRIGGER).click({ force: true });

        cy.get(TEXTSTYLE_OPTION).first().click();
        cy.get("[contenteditable=true]").should("include.html", "<h1");

        cy.get(TEXTSTYLE_OPTION).eq(1).click();
        cy.get("[contenteditable=true]").should("include.html", "<h2");

        cy.get(TEXTSTYLE_OPTION).eq(2).click();
        cy.get("[contenteditable=true]").should("include.html", "<h3");

        cy.get(TEXTSTYLE_OPTION).eq(3).click();
        cy.get("[contenteditable=true]").should("include.html", "<h4");
    });

    it("emits onTextChange when choosing an inline style", () => {
        const onTextChange = cy.stub();
        mount(<RichTextEditor onTextChange={onTextChange} />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_MARK_BUTTONS)
            .children()
            .eq(0)
            .click()
            .wait(ON_SAVE_DELAY_IN_MS)
            .then(() => {
                expect(onTextChange).to.be.called; // succeeds
            });
    });

    it("emits onTextChange when choosing a block style", () => {
        const onTextChange = cy.stub();
        mount(<RichTextEditor onTextChange={onTextChange} />);

        insertTextAndOpenToolbar();
        cy.get(TEXT_ELEMENT_BUTTONS)
            .children()
            .eq(1)
            .click()
            .wait(ON_SAVE_DELAY_IN_MS)
            .then(() => {
                expect(onTextChange).to.be.called; // succeeds
            });
    });

    it("should clear editor content", () => {
        const text = "This is some text";
        mount(<RichTextWithClearButton value={JSON.stringify([{ type: ELEMENT_PARAGRAPH, children: [{ text }] }])} />);

        cy.get(RICH_TEXT_EDITOR).should("contain.text", text);
        cy.get("[data-test-id=clear-button]").click();
        cy.get(RICH_TEXT_EDITOR).should("contain.text", "");
    });
});
