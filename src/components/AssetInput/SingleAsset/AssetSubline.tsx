import React, { FC, Fragment } from 'react';
import { AssetInputProps } from '../AssetInput';
import { SelectedAssetProps } from './SelectedAsset';
import { IconArrowCircleUp, IconImageStack } from '@foundation/Icon';

type AssetSublineProps = Pick<AssetInputProps, 'isLoading'> & Pick<SelectedAssetProps, 'asset'>;

export const AssetSubline: FC<AssetSublineProps> = ({ asset, isLoading = false }) => {
    const title = isLoading ? 'Uploading' : asset?.source === 'library' ? asset.sourceName : 'Uploaded';
    return (
        <span className="tw-max-w-full tw-flex tw-flex-row tw-items-center tw-gap-1 tw-text-black-80 tw-text-xxs tw-overflow-hidden">
            <div className="tw-flex-none tw-inline-flex tw-items-center tw-justify-center">
                {asset?.source === 'library' ? <IconImageStack /> : <IconArrowCircleUp />}
            </div>
            {title && <span>{title}</span>}
            {asset &&
                !isLoading &&
                [asset.extension, asset.size].filter(Boolean).map((item, i) => (
                    <Fragment key={`${item}-${i}`}>
                        <span className="tw-text-m tw-text-black-20 tw-h-4 tw-flex tw-items-center">•</span>
                        <span>{item}</span>
                    </Fragment>
                ))}
        </span>
    );
};
