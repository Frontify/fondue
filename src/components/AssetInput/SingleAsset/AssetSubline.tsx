/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { AssetInputProps } from '../AssetInput';
import { SelectedAssetProps } from './SelectedAsset';
import { IconArrowCircleUp, IconImageStack } from '@foundation/Icon/Generated';

type AssetSublineProps = Pick<AssetInputProps, 'isLoading' | 'hideSize' | 'hideExtension'> &
    Pick<SelectedAssetProps, 'asset'>;

export const AssetSubline: FC<AssetSublineProps> = ({
    asset,
    isLoading = false,
    hideSize = false,
    hideExtension = false,
}) => {
    let title = isLoading ? 'Uploading' : 'Uploaded';
    if (asset?.source === 'library') {
        title = asset.sourceName;
    }

    return (
        <span className="tw-max-w-full tw-flex tw-flex-row tw-items-center tw-gap-1 tw-text-black-80 tw-text-xxs tw-overflow-hidden">
            <div className="tw-flex-none tw-inline-flex tw-items-center tw-justify-center">
                {asset?.source === 'library' ? <IconImageStack /> : <IconArrowCircleUp />}
            </div>
            {title && <span className="tw-whitespace-nowrap">{title}</span>}
            {asset && !isLoading && (
                <>
                    <FileInfo label={asset.extension} hide={hideExtension} />
                    <FileInfo label={asset.size} hide={hideSize} />
                </>
            )}
        </span>
    );
};
AssetSubline.displayName = 'FondueAssetSubline';

const FileInfo: FC<{ label?: string | number; hide: boolean }> = ({ label, hide }) => {
    if (hide || !label) {
        return null;
    }

    return (
        <>
            <span className="tw-text-m tw-text-black-20 tw-h-4 tw-flex tw-items-center">•</span>
            <span className="tw-whitespace-nowrap">{label}</span>
        </>
    );
};
FileInfo.displayName = 'FondueFileInfo';
