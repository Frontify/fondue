/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";
import { MenuItemStyle } from "@components/Menu/MenuItem/MenuItem";
import IconCrop from "@elements/Icon/Generated/IconCrop";
import IconExternalLink from "@elements/Icon/Generated/IconExternalLink";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import IconImageLibrary from "@elements/Icon/Generated/IconImageLibrary";
import IconReject from "@elements/Icon/Generated/IconReject";
import IconUploadAlternative from "@elements/Icon/Generated/IconUploadAlternative";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { AssetInput, AssetInputProps, AssetInputSize } from "./AssetInput";

const actions = [
    {
        id: "block1",
        ariaLabel: "First section",
        menuItems: [
            {
                id: "1",
                title: "Replace with Asset",
                decorator: <IconImageLibrary />,
            },
            {
                id: "2",
                title: "Replace with Upload",
                decorator: <IconUploadAlternative />,
            },
        ],
    },
    {
        id: "block2",
        ariaLabel: "Second section",
        menuItems: [
            {
                id: "10",
                title: "Crop / Resize",
                decorator: <IconCrop />,
            },
            {
                id: "11",
                title: "Small warning",
                decorator: <IconExternalLink />,
            },
        ],
    },
    {
        id: "block3",
        ariaLabel: "Third section",
        menuItems: [
            {
                id: "20",
                title: "Remove",
                style: MenuItemStyle.Danger,
                decorator: <IconReject />,
            },
        ],
    },
] as ActionMenuBlock[];

export default {
    title: "Components/Asset Input",
    component: AssetInput,
    argTypes: {
        onUploadClick: { action: "onUploadClick", table: { disable: true } },
        size: {
            options: Object.values(AssetInputSize),
            control: { type: "radio" },
        },
        onItemClick: { action: "onItemClick", table: { disable: true } },
    },
    args: {
        size: AssetInputSize.Small,
    },
} as Meta<AssetInputProps>;

const Template: Story<AssetInputProps & { onItemClick: () => void }> = (args) => {
    args.actions?.forEach((block) =>
        block.menuItems.forEach((item) => {
            item.onClick = args.onItemClick;
        }),
    );
    return <AssetInput {...args} />;
};

export const Placeholder = Template.bind({});

Placeholder.argTypes = {
    onLibraryClick: { action: "onLibraryClick", table: { disable: true } },
    size: { table: { disable: true } },
};

export const PlaceholderUploadOnly = Template.bind({});

PlaceholderUploadOnly.argTypes = {
    size: { table: { disable: true } },
};

export const Image = Template.bind({});

Image.args = {
    asset: {
        source: "upload",
        name: "foo",
        size: 2000,
        type: "image",
        extension: "JPG",
        src: "https://picsum.photos/200/300",
    },
    actions,
};

export const Audio = Template.bind({});

Audio.args = {
    asset: {
        source: "library",
        sourceName: "Foobar",
        name: "foo",
        extension: "MP3",
        size: 2000,
        type: "audio",
    },
    actions,
};

export const Icon = Template.bind({});

Icon.args = {
    asset: {
        source: "library",
        sourceName: "Foobar",
        name: "foo",
        type: "icon",
        icon: <IconIcons />,
    },
    actions,
};
