/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';

import { AssetInputBrowseInput, type AssetInputBrowseInputProps } from './AssetInputBrowseInput';
import { AssetInputMetadata, type AssetInputMetadataProps } from './AssetInputMetadata';
import { AssetInputMetadataItem, type AssetInputMetadataItemProps } from './AssetInputMetadataItem';
import { AssetInputPlaceholder, type AssetInputPlaceholderProps } from './AssetInputPlaceholder';
import { AssetInputPreview, type AssetInputPreviewProps } from './AssetInputPreview';
import { AssetInputPreviewIcon, type AssetInputPreviewIconProps } from './AssetInputPreviewIcon';
import { AssetInputPreviewImage, type AssetInputPreviewImageProps } from './AssetInputPreviewImage';
import { AssetInputPreviewLoading } from './AssetInputPreviewLoading';
import { AssetInputRoot, type AssetInputRootProps } from './AssetInputRoot';
import { AssetInputTitle, type AssetInputTitleProps } from './AssetInputTitle';
import { AssetInputUploadInput, type AssetInputUploadInputProps } from './AssetInputUploadInput';

export type { AssetInputRootProps };

export const AssetInput = {
    Placeholder: forwardRef<HTMLDivElement, AssetInputPlaceholderProps>(AssetInputPlaceholder),
    UploadInput: forwardRef<HTMLButtonElement, AssetInputUploadInputProps>(AssetInputUploadInput),
    BrowseInput: forwardRef<HTMLButtonElement, AssetInputBrowseInputProps>(AssetInputBrowseInput),
    Root: forwardRef<HTMLButtonElement, AssetInputRootProps>(AssetInputRoot),
    Preview: forwardRef<HTMLDivElement, AssetInputPreviewProps>(AssetInputPreview),
    PreviewImage: forwardRef<HTMLImageElement, AssetInputPreviewImageProps>(AssetInputPreviewImage),
    PreviewIcon: forwardRef<HTMLDivElement, AssetInputPreviewIconProps>(AssetInputPreviewIcon),
    Title: forwardRef<HTMLSpanElement, AssetInputTitleProps>(AssetInputTitle),
    Metadata: forwardRef<HTMLDivElement, AssetInputMetadataProps>(AssetInputMetadata),
    MetadataItem: forwardRef<HTMLSpanElement, AssetInputMetadataItemProps>(AssetInputMetadataItem),
    PreviewLoading: forwardRef<HTMLDivElement>(AssetInputPreviewLoading),
};
