/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenuProps } from "@components/ActionMenu/ActionMenu/ActionMenu";
import { Button, ButtonStyle } from "@components/Button/Button";
import IconImageLibrary from "@foundation/Icon/Generated/IconImageLibrary";
import IconUploadAlternative from "@foundation/Icon/Generated/IconUploadAlternative";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { merge } from "@utilities/merge";
import React, { FC, ReactElement, useEffect, useRef } from "react";
import { MultiAssetPreview } from "./MultiAssetPreview";
import { SelectedAsset } from "./SingleAsset/SelectedAsset";

type BaseAsset = {
    name: string;
};

export type ImageAsset = {
    type: "image" | "logo";
    name: string;
    extension: string;
    src?: string;
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

export type UploadSource = { source: "upload"; sourceName?: undefined };
export type LibrarySource = { source: "library"; sourceName: string };

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

export type AssetInputProps = {
    assets?: AssetType[];
    size: AssetInputSize;
    numberOfLocations?: number;
    actions?: ActionMenuProps["menuBlocks"];
    isLoading?: boolean;
    onUploadClick?: (files: FileList) => void;
    onLibraryClick?: () => void;
    onMultiAssetClick?: () => void;
    acceptFileType?: string;
};

export const AssetInput: FC<AssetInputProps> = ({
    assets = [],
    numberOfLocations = 1,
    actions = [],
    size = AssetInputSize.Small,
    isLoading = false,
    onLibraryClick,
    onUploadClick,
    onMultiAssetClick,
    acceptFileType,
}) => {
    const assetsLength = assets.length;
    const id = useMemoizedId();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onFileChange = (event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && onUploadClick) {
            onUploadClick(files);
        }
    };

    useEffect(() => {
        inputRef?.current?.addEventListener("change", (event: Event) => onFileChange(event));
        return inputRef?.current?.removeEventListener("change", (event: Event) => onFileChange(event));
    }, [inputRef]);

    if ((isLoading || assetsLength === 1) && actions) {
        return <SelectedAsset asset={assets[0]} size={size} actions={actions} isLoading={isLoading} />;
    }

    if (assetsLength > 1 && onMultiAssetClick) {
        return <MultiAssetPreview assets={assets} onClick={onMultiAssetClick} numberOfLocations={numberOfLocations} />;
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
                <div
                    className={merge(["tw-flex tw-flex-col tw-h-8", onLibraryClick && "tw-pr-3"])}
                    data-test-id="asset-input-upload"
                >
                    <label
                        className="tw-relative tw-cursor-pointer tw-rounded tw-flex tw-items-center tw-justify-center tw-px-4 tw-h-9 tw-text-s tw-text-black-80 tw-bg-transparent hover:tw-bg-black-10 hover:tw-text-black active:tw-bg-black-20 active:tw-text-black dark:tw-text-white dark:hover:tw-bg-black-95 dark:active:tw-bg-black-superdark dark:hover:tw-text-white"
                        htmlFor={id}
                    >
                        <span className="tw--ml-1 tw-mr-1.5">
                            <IconUploadAlternative size={IconSize.Size20} />
                        </span>
                        Upload
                    </label>
                    <input
                        id={id}
                        ref={inputRef}
                        className="tw-hidden"
                        type="file"
                        accept={acceptFileType}
                        multiple={!!onMultiAssetClick}
                    />
                </div>
            )}
            {onLibraryClick && (
                <div
                    className={merge(["tw-flex tw-flex-col tw-h-8", onUploadClick && "tw-pl-3"])}
                    data-test-id="asset-input-library"
                >
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
