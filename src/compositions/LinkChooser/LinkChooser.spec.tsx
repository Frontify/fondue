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
    it("should render correctly", () => {
        mount(<LinkChooser selectMenuBlocks={selectMenuBlocks} actionMenuBlocks={actionMenuBlocks} />);

        cy.get("[data-test-id=link-chooser]").as("LinkChooser");

        cy.get("@LinkChooser").should("be.visible");
    });
});
