/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { type ReactElement } from 'react';

import { AssetInputSize, type AssetType, type ImageAsset, type LibrarySource } from '../AssetInput';
import { AssetThumbnail } from '../AssetThumbnail';

import { type MultiAssetPreviewProps } from './MultiAssetPreview';

const isImageAsset = (asset: AssetType): asset is ImageAsset & LibrarySource =>
    asset.type === 'image' || asset.type === 'logo';

export const SelectedAssetsThumbnail = ({ assets }: Pick<MultiAssetPreviewProps, 'assets'>): ReactElement => {
    const assetslength = assets.length;
    const previewAssets = assets.slice(0, 4);

    if (assetslength < 4) {
        for (const [index] of [...Array(4 - assetslength)].entries()) {
            previewAssets.push({
                name: `empty picture ${index + 1}`,
                size: 20,
                type: 'image',
                extension: '',
                src: '',
                source: 'upload',
            });
        }
    }
    return (
        <div className="tw-border-black-20 tw-grid tw-grid-cols-2 tw-gap-0.5">
            {previewAssets.map((asset, index) =>
                isImageAsset(asset) ? (
                    <div
                        data-test-id="assets-image"
                        key={asset.name}
                        style={asset.src ? { backgroundImage: `url(${asset.src})` } : {}}
                        className={merge([
                            index === 0 ? 'tw-rounded-tl' : index === 2 && 'tw-rounded-bl',
                            'tw-h-11 tw-w-11 tw-bg-black-5',
                        ])}
                    />
                ) : (
                    <div className="tw-h-11 tw-w-11" key={asset.src}>
                        <AssetThumbnail asset={asset} size={AssetInputSize.Small} isMultiAsset />
                    </div>
                ),
            )}
        </div>
    );
};
SelectedAssetsThumbnail.displayName = 'FondueSelectedAssetsThumbnail';
