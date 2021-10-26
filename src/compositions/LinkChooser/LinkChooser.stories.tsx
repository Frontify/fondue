/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { LinkChooser, LinkChooserProps } from "./LinkChooser";
import { SelectionIndicatorIcon } from "@components/Menu/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/Menu/MenuItem/MenuItemContent";
import IconDocument from "@elements/Icon/Generated/IconDocument";
import IconLink from "@elements/Icon/Generated/IconLink";
import IconExternalLink from "@elements/Icon/Generated/IconExternalLink";
import IconDocumentLibrary from "@elements/Icon/Generated/IconDocumentLibrary";

export default {
    title: "Components/LinkChooser",
    component: LinkChooser,
    args: {
        placeholder: "https://example.com",
        disabled: false,
        clearable: false,
        decorator: <IconLink />,
    },
} as Meta<LinkChooserProps>;

const LinkChooserTemplate: Story<LinkChooserProps> = (args: LinkChooserProps) => {
    return <LinkChooser {...args} />;
};

export const Default = LinkChooserTemplate.bind({});

Default.args = {
    menuBlocks: [
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
                },
                {
                    id: "2",
                    title: "Document Group",
                    subtitle: "Guide ABC",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    decorator: <IconDocumentLibrary />,
                },
                {
                    id: "3",
                    title: "Brand listening - Glossary & Docu.",
                    subtitle: "Guideline XYZ",
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    decorator: <IconDocument />,
                },
                {
                    id: "4",
                    title: '"Bran"',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    decorator: <IconLink />,
                },
                {
                    id: "5",
                    title: '"www.website.com"',
                    size: MenuItemContentSize.Large,
                    selectionIndicator: SelectionIndicatorIcon.None,
                    decorator: <IconExternalLink />,
                },
            ],
        },
        {
            id: "Actions",
            menuItems: [
                {
                    id: "6",
                    title: "Guidelines",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                },
                {
                    id: "7",
                    title: "Templates",
                    size: MenuItemContentSize.Small,
                    selectionIndicator: SelectionIndicatorIcon.CaretRight,
                },
            ],
        },
    ],
};
