/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { MultiAssetPreview as MultiAssetPreviewComponent, MultiAssetPreviewProps } from "./MultiAssetPreview";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Multi Asset Preview",
    component: MultiAssetPreviewComponent,
    argTypes: {
        onClick: {
            action: "Click",
        },
        images: {},
    },
    args: {
        numberOfLocations: 12,
        assetsAmount: 25,
    },
} as Meta<MultiAssetPreviewProps>;

export const WithOneImage: Story<MultiAssetPreviewProps> = (args: MultiAssetPreviewProps) => (
    <MultiAssetPreviewComponent
        {...args}
        images={[
            {
                name: "foo1",
                size: 2000,
                type: "image",
                extension: "JPG",
                src: "https://picsum.photos/100/150",
            },
        ]}
    />
);

export const WithImages: Story<MultiAssetPreviewProps> = (args: MultiAssetPreviewProps) => (
    <MultiAssetPreviewComponent
        {...args}
        images={[
            {
                name: "foo1",
                size: 2000,
                type: "image",
                extension: "JPG",
                src: "https://picsum.photos/100/150",
            },
            {
                name: "foo2",
                size: 2000,
                type: "image",
                extension: "JPG",
                src: "https://picsum.photos/200/200",
            },
            {
                name: "foo3",
                size: 2000,
                type: "image",
                extension: "JPG",
                src: "https://picsum.photos/100/100",
            },
            {
                name: "foo4",
                size: 1000,
                type: "image",
                extension: "JPG",
                src: "https://picsum.photos/400/200",
            },
        ]}
    />
);
