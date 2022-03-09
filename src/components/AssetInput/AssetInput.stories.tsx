/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@foundation/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { actions } from "./actions";
import { AssetInput, AssetInputSize, AssetProps } from "./AssetInput";

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
        onMultiAssetClick: {
            action: "Click",
        },
    },
    args: {
        size: AssetInputSize.Small,
        isLoading: false,
        numberOfLocations: 1,
    },
} as unknown as Meta<AssetProps>;

const Template: Story<AssetProps & { onItemClick: () => void }> = (args) => {
    args.actions?.forEach((block) =>
        block.menuItems.forEach((item) => {
            item.onClick = args.onItemClick;
        }),
    );
    if (args.isLoading && args.assets) {
        args.assets = undefined;
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
    assets: [
        {
            source: "upload",
            name: "foo",
            size: 2000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/200/300",
        },
    ],
    actions,
};

export const Audio = Template.bind({});

Audio.args = {
    assets: [
        {
            source: "library",
            sourceName: "Foobar",
            name: "foo",
            extension: "MP3",
            size: 2000,
            type: "audio",
        },
    ],
    actions,
};

export const Icon = Template.bind({});

Icon.args = {
    assets: [
        {
            source: "library",
            sourceName: "Foobar",
            name: "foo",
            type: "icon",
            icon: <IconIcons />,
        },
    ],
    actions,
};

const TemplateMultiInput: Story<AssetProps> = (args) => {
    return <AssetInput {...args} />;
};

export const TwoAssets = TemplateMultiInput.bind({});

TwoAssets.args = {
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
            source: "library",
            sourceName: "Foobar",
            name: "foo",
            type: "icon",
            icon: <IconIcons />,
        },
    ],
    numberOfLocations: 1,
    actions,
};

export const OnlyImageAssets = TemplateMultiInput.bind({});

OnlyImageAssets.args = {
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
        {
            name: "foo5",
            size: 1000,
            type: "image",
            extension: "JPG",
            src: "https://picsum.photos/400/200",
            source: "library",
            sourceName: "",
        },
    ],
    numberOfLocations: 2,
};

export const MixedAssets = TemplateMultiInput.bind({});

MixedAssets.args = {
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
    numberOfLocations: 2,
};
