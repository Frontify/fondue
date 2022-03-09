import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { AssetInputSize } from "../AssetInput";
import { AssetThumbnail } from "../AssetThumbnail";
import { MultiAssetPreviewProps } from "./MultiAssetPreview";

export const Assets: FC<Pick<MultiAssetPreviewProps, "assets">> = ({ assets }) => {
    const length = assets?.length || 0;
    const assetsNew = assets?.slice(0, 4) || [];

    if (length < 4) {
        [...Array(4 - length)].map((item, index) =>
            assetsNew.push({
                name: `empty picture ${index + 1}`,
                size: 20,
                type: "image",
                extension: "",
                src: "",
                source: "upload",
            }),
        );
    }
    return (
        <div className="tw-border-black-20 tw-grid tw-grid-cols-2 tw-gap-0.5">
            {assetsNew.map((asset, index) =>
                asset.type === "image" || asset.type === "logo" ? (
                    <div
                        data-test-id="assets-image"
                        key={asset.name}
                        style={asset.src ? { backgroundImage: `url(${asset.src})` } : {}}
                        className={merge([
                            index === 0 ? "tw-rounded-tl" : index === 2 && "tw-rounded-bl",
                            "tw-h-14 tw-w-14 tw-bg-black-5",
                        ])}
                    />
                ) : (
                    <div className="tw-h-14">
                        <AssetThumbnail asset={asset} size={AssetInputSize.Small} isActive={false} />
                    </div>
                ),
            )}
        </div>
    );
};
