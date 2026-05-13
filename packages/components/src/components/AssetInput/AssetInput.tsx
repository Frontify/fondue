/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetInputBrowseInput } from './AssetInputBrowseInput';
import { AssetInputMetadata } from './AssetInputMetadata';
import { AssetInputPlaceholder } from './AssetInputPlaceholder';
import { AssetInputPreview } from './AssetInputPreview';
import { AssetInputPreviewIcon } from './AssetInputPreviewIcon';
import { AssetInputPreviewImage } from './AssetInputPreviewImage';
import { AssetInputPreviewLoading } from './AssetInputPreviewLoading';
import { AssetInputRoot, type AssetInputRootProps } from './AssetInputRoot';
import { AssetInputTitle } from './AssetInputTitle';
import { AssetInputUploadInput } from './AssetInputUploadInput';

export type { AssetInputRootProps };

export const AssetInput = {
    Placeholder: AssetInputPlaceholder,
    UploadInput: AssetInputUploadInput,
    BrowseInput: AssetInputBrowseInput,
    Root: AssetInputRoot,
    Preview: AssetInputPreview,
    PreviewImage: AssetInputPreviewImage,
    PreviewIcon: AssetInputPreviewIcon,
    Title: AssetInputTitle,
    Metadata: AssetInputMetadata,
    PreviewLoading: AssetInputPreviewLoading,
};
