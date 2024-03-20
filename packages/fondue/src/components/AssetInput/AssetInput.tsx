/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuProps } from '@components/ActionMenu/ActionMenu/ActionMenu';
import { Button, ButtonEmphasis, ButtonStyle } from '@components/Button';
import { IconProps } from '@foundation/Icon/IconProps';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { merge } from '@utilities/merge';
import { ChangeEvent, ReactElement, useRef } from 'react';
import { MultiAssetPreview } from './MultiAssetPreview';
import { SelectedAsset } from './SingleAsset/SelectedAsset';
import IconArrowCircleUp from '@foundation/Icon/Generated/IconArrowCircleUp';
import IconImageStack from '@foundation/Icon/Generated/IconImageStack';

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
    disabled?: boolean;
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
    disabled = false,
}: AssetInputProps): ReactElement => {
    const assetsLength = assets.length;
    const inputFile = useRef<HTMLInputElement | null>(null);
    const id = useMemoizedId();

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && onUploadClick) {
            onUploadClick(files);
        }
    };

    const onOpenFileUpload = () => {
        if (inputFile.current) {
            inputFile.current.click();
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
                disabled={disabled}
            />
        );
    }

    if (assetsLength > 1 && onMultiAssetClick) {
        return (
            <MultiAssetPreview
                assets={assets}
                onClick={onMultiAssetClick}
                numberOfLocations={numberOfLocations}
                disabled={disabled}
            />
        );
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
                    <Button
                        style={ButtonStyle.Default}
                        onClick={onOpenFileUpload}
                        emphasis={ButtonEmphasis.Weak}
                        icon={<IconArrowCircleUp />}
                        disabled={disabled}
                    >
                        Upload
                    </Button>
                    <input
                        id={id}
                        ref={inputFile}
                        className="tw-hidden"
                        type="file"
                        accept={acceptFileType}
                        multiple={!!onMultiAssetClick}
                        onChange={onFileChange}
                        disabled={disabled}
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
                        disabled={disabled}
                    >
                        Browse
                    </Button>
                </div>
            )}
        </div>
    );
};
AssetInput.displayName = 'FondueAssetInput';
