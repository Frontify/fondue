/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuBlock } from "@components/ActionMenu/ActionMenu/ActionMenu";
import { MenuItemStyle } from "@components/MenuItem/MenuItem";
import IconCrop from "@foundation/Icon/Generated/IconCrop";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconIcons from "@foundation/Icon/Generated/IconIcons";
import IconImageLibrary from "@foundation/Icon/Generated/IconImageLibrary";
import IconReject from "@foundation/Icon/Generated/IconReject";
import IconUploadAlternative from "@foundation/Icon/Generated/IconUploadAlternative";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { AssetInput, AssetInputProps, AssetInputSize } from "./AssetInput";
import { MultiAssetPreview, MultiAssetPreviewProps } from "./MultiAssetPreview";

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

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Asset Input",
    component: AssetInput,
    argTypes: {
        size: {
            options: Object.values(AssetInputSize),
            control: { type: "radio" },
        },
        onItemClick: { action: "onItemClick", table: { disable: true } },
    },
    args: {
        size: AssetInputSize.Small,
        isLoading: false,
    },
} as Meta<AssetInputProps>;

const Template: Story<AssetInputProps & { onItemClick: () => void }> = (args) => {
    args.actions?.forEach((block) =>
        block.menuItems.forEach((item) => {
            item.onClick = args.onItemClick;
        }),
    );
    if (args.isLoading && args.asset) {
        args.asset = undefined;
    }

    return <AssetInput {...args} />;
};

export const Placeholder = Template.bind({});

Placeholder.argTypes = {
    onUploadClick: { action: "onUploadClick", table: { disable: true } },
    onLibraryClick: { action: "onLibraryClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
};

export const PlaceholderUploadOnly = Template.bind({});

PlaceholderUploadOnly.argTypes = {
    onUploadClick: { action: "onUploadClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
};

export const PlaceholderLibraryOnly = Template.bind({});

PlaceholderLibraryOnly.argTypes = {
    onLibraryClick: { action: "onLibraryClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
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

const TemplateMultiInput: Story<MultiAssetPreviewProps> = (args) => {
    return <MultiAssetPreview {...args} />;
};

export const MultiInputOneImage = TemplateMultiInput.bind({});

MultiInputOneImage.args = {
    assets: [
        {
            name: "foo1",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/100/150",
            source: "library",
            sourceName: "",
        },
    ],
    numberOfLocations: 1,
    assetsAmount: 1,
};

export const WithImageAssets = TemplateMultiInput.bind({});

WithImageAssets.args = {
    assets: [
        {
            name: "foo1",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/100/150",
            source: "library",
            sourceName: "",
        },
        {
            name: "foo2",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/200/200",
            source: "library",
            sourceName: "",
        },
        {
            name: "foo3",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/100/100",
            source: "library",
            sourceName: "",
        },
        {
            name: "foo4",
            size: 1000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/400/200",
            source: "library",
            sourceName: "",
        },
    ],
    numberOfLocations: 2,
    assetsAmount: 4,
};

export const WithMixedAssets = TemplateMultiInput.bind({});

WithMixedAssets.args = {
    assets: [
        {
            name: "foo2",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/200/200",
            source: "library",
            sourceName: "",
        },
        {
            name: "foo3",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/100/100",
            source: "library",
            sourceName: "",
        },
        {
            source: "library",
            sourceName: "Foobar",
            name: "foo",
            type: "icon",
            icon: <IconIcons />,
        },
        {
            source: "library",
            sourceName: "Foobar",
            name: "foo",
            extension: "MP3",
            size: 2000,
            type: "audio",
        },
    ],
    numberOfLocations: 12,
    assetsAmount: 25,
};
