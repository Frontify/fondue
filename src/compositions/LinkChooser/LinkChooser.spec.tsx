/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { LinkChooser } from "./LinkChooser";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/Menu/MenuItem/MenuItem";
import IconDocument from "@elements/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@elements/Icon/Generated/IconDocumentLibrary";
import IconLink from "@elements/Icon/Generated/IconLink";
import IconExternalLink from "@elements/Icon/Generated/IconExternalLink";

const LINK_CHOOSER_ID = "[data-test-id=link-chooser]";
/* const SEARCH_WRAPPER_ID = "[data-test-id=search-wrapper]";
const SEARCH_INPUT_ID = "[data-test-id=search-input]";
const PREVIEW_ICON_ID = "[data-test-id=preview-icon]";
const COPY_ICON_ID = "[data-test-id=copy-icon]";
const DISCARD_ICON_ID = "[data-test-id=discard-icon]";
const SELECT_SECTION_ID = "[data-test-id=select-section]"; */

const selectMenuBlocks = [
    {
        id: "Suggestions",
        menuItems: [
            {
                id: "1",
                title: "Brand listening - A Memoir",
                subtitle: "Guideline XYZ",
                size: MenuItemContentSize.Large,
                selectionIndicator: SelectionIndicatorIcon.None,
                decorator: <IconDocument />,
                link: "https://www.frontify.com",
            },
            {
                id: "2",
                title: "Document Group",
                subtitle: "Guide ABC",
                size: MenuItemContentSize.Large,
                selectionIndicator: SelectionIndicatorIcon.None,
                decorator: <IconDocumentLibrary />,
                link: "https://www.frontify.com/en/brand-guidelines/",
            },
            {
                id: "3",
                title: "Brand listening - Glossary & Docu.",
                subtitle: "Guideline XYZ",
                size: MenuItemContentSize.Large,
                selectionIndicator: SelectionIndicatorIcon.None,
                decorator: <IconDocument />,
                link: "https://www.frontify.com/en/digital-asset-management/",
            },
            {
                id: "4",
                title: '"Bran"',
                size: MenuItemContentSize.Large,
                selectionIndicator: SelectionIndicatorIcon.None,
                decorator: <IconLink />,
                link: "https://www.frontify.com/en/creative-collaboration/",
            },
            {
                id: "5",
                title: '"www.website.com"',
                size: MenuItemContentSize.Large,
                selectionIndicator: SelectionIndicatorIcon.None,
                decorator: <IconExternalLink />,
                link: "https://www.frontify.com/en/digital-and-print-templates/",
            },
        ],
    },
];

const actionMenuBlocks = [
    {
        id: "Actions",
        menuItems: [
            {
                id: "6",
                title: "Guidelines",
                size: MenuItemContentSize.Small,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: () => console.log("Guidelines clicked"),
            },
            {
                id: "7",
                title: "Templates",
                size: MenuItemContentSize.Small,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: () => console.log("Templates clicked"),
            },
        ],
    },
];

describe("LinkChooser Component", () => {
    it("renders correctly", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.get(LINK_CHOOSER_ID).should("be.visible");
    });
    // TODO - No longer valid because of localStorage
    /*     it("displays children on click", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.get(SEARCH_WRAPPER_ID).click();
        cy.get(SELECT_SECTION_ID).children().should("have.length", selectMenuBlocks[0].menuItems.length);
        cy.get(PREVIEW_ICON_ID).should("not.exist");
        cy.get(COPY_ICON_ID).should("not.exist");
        cy.get(DISCARD_ICON_ID).should("not.exist");
    });
    it("changes selection on click", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.get(SEARCH_INPUT_ID).click();
        cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
        cy.get(`${SELECT_SECTION_ID} > li`).eq(2).as("thirdSelectItem");

        cy.get("@firstSelectItem").click();
        cy.get(SEARCH_INPUT_ID).should("have.value", selectMenuBlocks[0].menuItems[0].title);

        cy.get(PREVIEW_ICON_ID).should("be.visible");
        cy.get(COPY_ICON_ID).should("be.visible");
        cy.get(DISCARD_ICON_ID).should("be.visible");

        cy.get(DISCARD_ICON_ID).click();

        cy.get(PREVIEW_ICON_ID).should("not.exist");
        cy.get(COPY_ICON_ID).should("not.exist");
        cy.get(DISCARD_ICON_ID).should("not.exist");

        cy.get(SEARCH_INPUT_ID).click();

        cy.get("@thirdSelectItem").click();
        cy.get(SEARCH_INPUT_ID).should("have.value", selectMenuBlocks[0].menuItems[2].title);

        cy.get(PREVIEW_ICON_ID).should("be.visible");
        cy.get(COPY_ICON_ID).should("be.visible");
        cy.get(DISCARD_ICON_ID).should("be.visible");
    });
    it("filters results on input change", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.get(SEARCH_INPUT_ID).click();
        cy.get(SELECT_SECTION_ID).children().should("have.length", selectMenuBlocks[0].menuItems.length);

        cy.get(SEARCH_INPUT_ID).type(selectMenuBlocks[0].menuItems[0].title);
        cy.get(SELECT_SECTION_ID).children().should("have.length", 1);

        cy.get(DISCARD_ICON_ID).click();
        cy.get(SELECT_SECTION_ID).children().should("have.length", selectMenuBlocks[0].menuItems.length);
    });
    it("opens the selected preview link on click", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.window().then((win) => {
            cy.stub(win, "open").as("Open");
        });

        cy.get(SEARCH_INPUT_ID).click();

        cy.get(`${SELECT_SECTION_ID} > li`).eq(2).as("thirdSelectItem");
        cy.get("@thirdSelectItem").click();

        cy.get(PREVIEW_ICON_ID).click();
        cy.get("@Open").should("have.been.calledWithMatch", selectMenuBlocks[0].menuItems[2].link);
    }); */
});
