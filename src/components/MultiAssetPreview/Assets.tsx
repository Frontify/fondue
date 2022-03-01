import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { MultiAssetPreviewProps } from "./MultiAssetPreview";

export const Assets: FC<Pick<MultiAssetPreviewProps, "images">> = ({ images }) => {
    const length = images?.length || 0;
    const imagesNew = images?.slice(0, 4) || [];

    if (length < 4) {
        [...Array(4 - length)].map(() =>
            imagesNew.push({
                name: "empty picture",
                size: 0,
                type: "image",
                extension: "",
                src: "",
            }),
        );
    }
    return (
        <div className="tw-border-black-20 tw-grid tw-grid-cols-2 tw-gap-0.5">
            {imagesNew.map((image, index) => {
                return (
                    <div
                        data-test-id="assets-image"
                        key={image.name}
                        style={image.src ? { backgroundImage: `url(${image.src})` } : {}}
                        className={merge([
                            index === 0 ? "tw-rounded-tl" : index === 2 && "tw-rounded-bl",
                            "tw-h-14 tw-w-14 tw-bg-grey-20",
                        ])}
                    />
                );
            })}
        </div>
    );
};
