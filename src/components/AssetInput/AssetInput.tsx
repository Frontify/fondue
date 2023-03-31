/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuProps } from '@components/ActionMenu/ActionMenu/ActionMenu';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { IconArrowCircleUp, IconImageStack } from '@foundation/Icon/';
import { IconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import React, { ChangeEvent, ReactElement } from 'react';
import { MultiAssetPreview } from './MultiAssetPreview';
import { SelectedAsset } from './SingleAsset/SelectedAsset';

type BaseAsset = {
    name: string;
};

export type ImageAsset = {
    type: 'image' | 'logo';
    name: string;
    extension: string;
    src?: string;
    alt?: string;
    icon?: undefined;
    size: number;
};

type OtherAsset = BaseAsset & {
    type: 'audio';
    extension: string;
    src?: undefined;
    alt?: undefined;
    icon?: undefined;
    size: number;
};

type IconAsset = BaseAsset & {
    type: 'icon';
    extension?: undefined;
    src?: undefined;
    alt?: undefined;
    icon: ReactElement<IconProps>;
    size?: undefined;
};

export type UploadSource = { source: 'upload'; sourceName?: undefined };
export type LibrarySource = { source: 'library'; sourceName: string };

export enum AssetInputSize {
    Small = 'Small',
    Large = 'Large',
}

export type AssetType =
    | (ImageAsset & UploadSource)
    | (ImageAsset & LibrarySource)
    | (IconAsset & UploadSource)
    | (IconAsset & LibrarySource)
    | (OtherAsset & UploadSource)
    | (OtherAsset & LibrarySource);

export type AssetInputProps = {
    assets?: AssetType[];
    size: AssetInputSize;
    numberOfLocations?: number;
    actions?: ActionMenuProps['menuBlocks'];
    isLoading?: boolean;
    hideSize?: boolean;
    hideExtension?: boolean;
    onUploadClick?: (files: FileList) => void;
    onLibraryClick?: () => void;
    onMultiAssetClick?: () => void;
    acceptFileType?: string;
};

export const AssetInput = ({
    assets = [],
    numberOfLocations = 1,
    actions = [],
    size = AssetInputSize.Small,
    isLoading = false,
    hideSize = false,
    hideExtension = false,
    onLibraryClick,
    onUploadClick,
    onMultiAssetClick,
    acceptFileType,
}: AssetInputProps): ReactElement => {
    const assetsLength = assets.length;
    const id = useMemoizedId();

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && onUploadClick) {
            onUploadClick(files);
        }
    };

    if ((isLoading || assetsLength === 1) && actions) {
        return (
            <SelectedAsset
                asset={assets[0]}
                size={size}
                actions={actions}
                isLoading={isLoading}
                hideExtension={hideExtension}
                hideSize={hideSize}
            />
        );
    }

    if (assetsLength > 1 && onMultiAssetClick) {
        return <MultiAssetPreview assets={assets} onClick={onMultiAssetClick} numberOfLocations={numberOfLocations} />;
    }

    return (
        <div
            data-test-id="asset-input-placeholder"
            className={merge([
                'tw-grid tw-p-3 tw-border tw-border-dashed tw-border-black-10 tw-rounded',
                onUploadClick && onLibraryClick ? 'tw-grid-cols-2 tw-divide-x tw-divide-black-10' : 'tw-grid-cols-1',
            ])}
        >
            {onUploadClick && (
                <div
                    className={merge(['tw-flex tw-flex-col tw-h-8', onLibraryClick && 'tw-pr-3'])}
                    data-test-id="asset-input-upload"
                >
                    <label
                        className="tw-relative tw-cursor-pointer tw-rounded tw-flex tw-items-center tw-justify-center tw-px-4 tw-h-9 tw-text-s  tw-bg-transparent hover:tw-bg-black-10 hover:tw-text-black active:tw-bg-black-20 active:tw-text-black dark:tw-text-white dark:hover:tw-bg-black-superdark dark:active:tw-bg-black-superdark dark:hover:tw-text-white tw-font-medium tw-text-black"
                        htmlFor={id}
                    >
                        <span className="tw--ml-1 tw-mr-1.5">
                            <IconArrowCircleUp size={IconSize.Size20} />
                        </span>
                        Upload
                    </label>
                    <input
                        id={id}
                        className="tw-hidden"
                        type="file"
                        accept={acceptFileType}
                        multiple={!!onMultiAssetClick}
                        onChange={onFileChange}
                    />
                </div>
            )}
            {onLibraryClick && (
                <div
                    className={merge(['tw-flex tw-flex-col tw-h-8', onUploadClick && 'tw-pl-3'])}
                    data-test-id="asset-input-library"
                >
                    <Button
                        style={ButtonStyle.Default}
                        onClick={onLibraryClick}
                        emphasis={ButtonEmphasis.Weak}
                        icon={<IconImageStack />}
                    >
                        Browse
                    </Button>
                </div>
            )}
        </div>
    );
};
AssetInput.displayName = 'FondueAssetInput';
