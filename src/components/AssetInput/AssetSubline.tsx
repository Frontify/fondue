import IconImageLibrary from "@foundation/Icon/Generated/IconImageLibrary";
import IconUploadAlternative from "@foundation/Icon/Generated/IconUploadAlternative";
import React, { FC } from "react";
import { AssetProps } from "./AssetInput";
import { SelectedAssetProps } from "./SelectedAsset";

type AssetSublineProps = Pick<AssetProps, "isLoading"> & Pick<SelectedAssetProps, "asset">;

export const AssetSubline: FC<AssetSublineProps> = ({ asset, isLoading = false }) => {
    const title = isLoading ? "Uploading" : asset?.source === "library" ? asset.sourceName : "Uploaded";
    return (
        <span className="tw-max-w-full tw-flex tw-flex-row tw-items-center tw-gap-1 tw-text-black-80 tw-text-xxs tw-overflow-hidden">
            <div className="tw-flex-none tw-inline-flex tw-items-center tw-justify-center">
                {asset?.source === "library" ? <IconImageLibrary /> : <IconUploadAlternative />}
            </div>
            <span>{title}</span>
            {asset &&
                !isLoading &&
                [asset.extension, asset.size].filter(Boolean).map((item) => (
                    <>
                        <span className="tw-text-m tw-text-black-20 tw-h-4 tw-flex tw-items-center">•</span>
                        <span>{item}</span>
                    </>
                ))}
        </span>
    );
};
