import IconAudio from "@foundation/Icon/Generated/IconAudio";
import { IconSize } from "@foundation/Icon/IconSize";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC } from "react";
import { AssetInputProps, AssetInputSize } from "./AssetInput";
import { SelectedAssetProps } from "./SingleAsset/SelectedAsset";

type AssetThumbnailProps = {
    asset: SelectedAssetProps["asset"];
    size: AssetInputProps["size"];
    isActive?: boolean;
    isMultiAsset?: boolean;
};

export const AssetThumbnail: FC<AssetThumbnailProps> = ({ asset, size, isActive, isMultiAsset = false }) => (
    <div
        className={merge([
            "tw-flex tw-flex-none tw-items-center tw-justify-center tw-bg-black-5 dark:tw-bg-black-95",
            size === AssetInputSize.Large
                ? "tw-w-full tw-h-32"
                : isMultiAsset
                ? "tw-w-11 tw-h-11"
                : "tw-w-14 tw-h-full",
            isActive ? "tw-text-black-100 dark:tw-text-white" : "tw-text-black-80 dark:tw-text-black-20",
        ])}
        data-test-id="asset-input-thumbnail"
    >
        {asset.type === "icon" ? (
            <span data-test-id="asset-input-thumbnail-icon">{cloneElement(asset.icon, { size: IconSize.Size24 })}</span>
        ) : asset.type === "audio" ? (
            <IconAudio size={IconSize.Size24} data-test-id="asset-input-thumbnail-audio" />
        ) : (
            <img
                src={asset.src}
                alt={asset.alt || ""}
                className="tw-max-h-full"
                data-test-id="asset-input-thumbnail-image"
            />
        )}
    </div>
);
