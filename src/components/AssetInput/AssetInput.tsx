/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuProps } from "@components/ActionMenu/ActionMenu/ActionMenu";
import { Button, ButtonStyle } from "@components/Button/Button";
import IconImageLibrary from "@foundation/Icon/Generated/IconImageLibrary";
import IconUploadAlternative from "@foundation/Icon/Generated/IconUploadAlternative";
import { IconProps } from "@foundation/Icon/IconProps";
import { merge } from "@utilities/merge";
import React, { FC, ReactElement } from "react";
import { MultiAssetPreview } from "./MultiAssetPreview";
import { SelectedAsset } from "./SelectedAsset";

type BaseAsset = {
    name: string;
};

export type ImageAsset = {
    type: "image" | "logo";
    name: string;
    extension: string;
    src: string;
    alt?: string;
    icon?: undefined;
    size: number;
};

type OtherAsset = BaseAsset & {
    type: "audio";
    extension: string;
    src?: undefined;
    alt?: undefined;
    icon?: undefined;
    size: number;
};

type IconAsset = BaseAsset & {
    type: "icon";
    extension?: undefined;
    src?: undefined;
    alt?: undefined;
    icon: ReactElement<IconProps>;
    size?: undefined;
};

type UploadSource = { source: "upload"; sourceName?: undefined };
type LibrarySource = { source: "library"; sourceName: string };

export enum AssetInputSize {
    Small = "Small",
    Large = "Large",
}

export type AssetType =
    | (ImageAsset & UploadSource)
    | (ImageAsset & LibrarySource)
    | (IconAsset & UploadSource)
    | (IconAsset & LibrarySource)
    | (OtherAsset & UploadSource)
    | (OtherAsset & LibrarySource);

export type AssetProps = {
    assets?: AssetType[];
    size: AssetInputSize;
    numberOfLocations?: number;
    actions?: ActionMenuProps["menuBlocks"];
    isLoading?: boolean;
    onUploadClick?: () => void;
    onLibraryClick?: () => void;
    onMultiAssetClick?: () => void;
};

export const AssetInput: FC<AssetProps> = ({
    assets,
    numberOfLocations,
    actions = [],
    size = AssetInputSize.Small,
    isLoading = false,
    onLibraryClick,
    onUploadClick,
    onMultiAssetClick,
}) => {
    const availableAssets = assets || [];
    const lengthAssets = availableAssets?.length || 0;

    if ((isLoading || lengthAssets === 1) && actions) {
        return <SelectedAsset asset={availableAssets[0]} size={size} actions={actions} isLoading={isLoading} />;
    }

    if (lengthAssets > 1 && onMultiAssetClick) {
        return (
            <MultiAssetPreview
                assets={availableAssets}
                onClick={onMultiAssetClick}
                assetsAmount={lengthAssets}
                numberOfLocations={numberOfLocations}
            />
        );
    }

    return (
        <div
            data-test-id="asset-input-placeholder"
            className={merge([
                "tw-grid tw-p-3 tw-border tw-border-dashed tw-border-black-10 tw-rounded",
                onUploadClick && onLibraryClick ? "tw-grid-cols-2 tw-divide-x tw-divide-black-10" : "tw-grid-cols-1",
            ])}
        >
            {onUploadClick && (
                <div className={merge(["tw-flex tw-flex-col tw-h-8", onLibraryClick && "tw-pr-3"])}>
                    <Button
                        onClick={onUploadClick}
                        style={ButtonStyle.Secondary}
                        solid={false}
                        icon={<IconUploadAlternative />}
                    >
                        Upload
                    </Button>
                </div>
            )}
            {onLibraryClick && (
                <div className={merge(["tw-flex tw-flex-col tw-h-8", onUploadClick && "tw-pl-3"])}>
                    <Button
                        onClick={onLibraryClick}
                        style={ButtonStyle.Secondary}
                        solid={false}
                        icon={<IconImageLibrary />}
                    >
                        Browse
                    </Button>
                </div>
            )}
        </div>
    );
};
