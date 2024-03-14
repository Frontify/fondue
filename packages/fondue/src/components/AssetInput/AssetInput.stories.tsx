/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { assetInputActions } from './asset-input-actions';
import { AssetInput, AssetInputProps, AssetInputSize } from './AssetInput';
import { EXAMPLE_IMAGES, MIXED_ASSETS } from './example-assets';

export default {
    title: 'Components/Asset Input',
    component: AssetInput,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(AssetInputSize),
            control: { type: 'radio' },
        },
        onItemClick: { action: 'onItemClick', table: { disable: true } },
        onMultiAssetClick: {
            action: 'onMultiAssetClick',
        },
        disabled: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
    },
    args: {
        size: AssetInputSize.Small,
        isLoading: false,
        hideSize: false,
        hideExtension: false,
        numberOfLocations: 1,
        disabled: false,
    },
} as Meta<AssetInputProps>;

const Template: StoryFn<AssetInputProps & { onItemClick: () => void }> = (args) => {
    if (args?.actions) {
        for (const block of args.actions) {
            for (const item of block.menuItems) {
                item.onClick = args.onItemClick;
            }
        }
    }

    if (args.isLoading && args.assets) {
        args.assets = undefined;
    }

    return <AssetInput {...args} />;
};

export const Placeholder = Template.bind({});

Placeholder.argTypes = {
    onUploadClick: { action: 'onUploadClick', table: { disable: true } },
    onLibraryClick: { action: 'onLibraryClick', table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    hideSize: { table: { disable: true } },
    hideExtension: { table: { disable: true } },
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const PlaceholderUploadOnly = Template.bind({});

PlaceholderUploadOnly.argTypes = {
    onUploadClick: { action: 'onUploadClick', table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    hideSize: { table: { disable: true } },
    hideExtension: { table: { disable: true } },
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const PlaceholderLibraryOnly = Template.bind({});

PlaceholderLibraryOnly.argTypes = {
    onLibraryClick: { action: 'onLibraryClick', table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    hideSize: { table: { disable: true } },
    hideExtension: { table: { disable: true } },
    numberOfLocations: { table: { disable: true } },
    onMultiAssetClick: { table: { disable: true } },
};

export const Image = Template.bind({});

Image.args = {
    assets: [EXAMPLE_IMAGES[0]],
    actions: assetInputActions,
};

export const ImageLibraryLarge = Template.bind({});

ImageLibraryLarge.args = {
    assets: [EXAMPLE_IMAGES[1]],
    size: AssetInputSize.Large,
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
    onUploadClick: { action: 'onUploadClick', table: { disable: true } },
    onLibraryClick: { action: 'onLibraryClick', table: { disable: true } },
    size: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    hideSize: { table: { disable: true } },
    hideExtension: { table: { disable: true } },
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
