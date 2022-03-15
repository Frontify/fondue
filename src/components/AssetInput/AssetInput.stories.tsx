/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { assetInputActions } from "./asset-input-actions";
import { AssetInput, AssetInputProps, AssetInputSize } from "./AssetInput";
import { EXAMPLE_IMAGES, MIXED_ASSETS } from "./example-assets";

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
            action: "onMultiAssetClick",
        },
    },
    args: {
        size: AssetInputSize.Small,
        isLoading: false,
        numberOfLocations: 1,
    },
} as Meta<AssetInputProps>;

const Template: Story<AssetInputProps & { onItemClick: () => void }> = (args) => {
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
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const PlaceholderUploadOnly = Template.bind({});

PlaceholderUploadOnly.argTypes = {
    onUploadClick: { action: "onUploadClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const PlaceholderLibraryOnly = Template.bind({});

PlaceholderLibraryOnly.argTypes = {
    onLibraryClick: { action: "onLibraryClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const Image = Template.bind({});

Image.args = {
    assets: [EXAMPLE_IMAGES[0]],
    actions: assetInputActions,
};

export const Audio = Template.bind({});

Audio.args = {
    assets: [MIXED_ASSETS[3]],
    actions: assetInputActions,
};

export const Icon = Template.bind({});

Icon.args = {
    assets: [MIXED_ASSETS[2]],
    actions: assetInputActions,
};

const multiAssetInputArgTypes = {
    onUploadClick: { action: "onUploadClick", table: { disable: true } },
    onLibraryClick: { action: "onLibraryClick", table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
};

export const MixedAssets = Template.bind({});

MixedAssets.args = {
    assets: [EXAMPLE_IMAGES[0], ...MIXED_ASSETS.slice(2, 4)],
    numberOfLocations: 1,
};

MixedAssets.argTypes = multiAssetInputArgTypes;

export const ImageAssets = Template.bind({});

ImageAssets.args = {
    assets: EXAMPLE_IMAGES,
    numberOfLocations: 2,
};

ImageAssets.argTypes = multiAssetInputArgTypes;
