import IconAudio from "@foundation/Icon/Generated/IconAudio";
import { IconSize } from "@foundation/Icon/IconSize";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC } from "react";
import { AssetInputSize, AssetProps } from "./AssetInput";
import { SelectedAssetProps } from "./SelectedAsset";

export type AssetThumbnailProps = {
    asset: SelectedAssetProps["asset"];
    size: AssetProps["size"];
    isActive?: boolean;
};
export const AssetThumbnail: FC<Required<AssetThumbnailProps>> = ({ asset, size, isActive }) => (
    <div
        className={merge([
            "tw-flex tw-flex-none tw-items-center tw-justify-center tw-bg-black-5 dark:tw-bg-black-95",
            size === AssetInputSize.Large ? "tw-w-full tw-h-32" : "tw-w-14 tw-h-full",
            isActive ? "tw-text-black-100 dark:tw-text-white" : "tw-text-black-80 dark:tw-text-black-20",
        ])}
    >
        {asset.type === "icon" ? (
            cloneElement(asset.icon, { size: IconSize.Size24 })
        ) : asset.type === "audio" ? (
            <IconAudio size={IconSize.Size24} />
        ) : (
            <img src={asset.src} alt={asset.alt || ""} className="tw-max-h-full" />
        )}
    </div>
);
