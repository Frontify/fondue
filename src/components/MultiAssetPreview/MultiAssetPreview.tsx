import { TooltipIcon } from "@components/TooltipIcon";
import { IconCaretRight, IconSize } from "@foundation/Icon";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";
import { ImageAsset } from "../AssetInput/AssetInput";

export type MultiAssetPreviewProps = {
    assetsAmount?: number;
    numberOfLocations?: number;
    images?: ImageAsset[];
    onClick: () => void;
};

export const MultiAssetPreview: FC<MultiAssetPreviewProps> = ({ assetsAmount, numberOfLocations, images, onClick }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton({ onPress: () => onClick() }, buttonRef);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div>
            <span className="tw-flex tw-flex-wrap tw-gap-1 tw-text-black-80 tw-mb-2 tw-text-lg">
                Selection
                <TooltipIcon
                    tooltip={{
                        content: "A selection can include individual assets and collections from multiple areas",
                    }}
                    iconSize={IconSize.Size20}
                />
            </span>
            <button
                title="multi-asset-preview"
                {...mergeProps(buttonProps, focusProps)}
                ref={buttonRef}
                className={merge([
                    "tw-flex tw-border tw-rounded hover:tw-border-black-90 dark:hover:tw-border-black-40 focus-visible:tw-outline-none dark:tw-text-white tw-mb-4",
                    isFocusVisible
                        ? "tw-border-black-90 dark:tw-border-black-10"
                        : "tw-border-black-20 dark:tw-border-black-80",
                ])}
            >
                <Assets images={images} />
                <div className="tw-py-7 tw-px-5 tw-flex tw-gap-2">
                    <div className="tw-text-left">
                        <div className="tw-font-bold tw-text-lg">{assetsAmount || 0} Assets</div>
                        <div className="tw-text-black-60">From {numberOfLocations || 0} locations</div>
                    </div>
                    <div className="tw-flex tw-items-center tw-text-black-70 tw-pl-4">
                        <IconCaretRight size={IconSize.Size24} />
                    </div>
                </div>
            </button>
        </div>
    );
};
type AssetsProps = {
    images?: ImageAsset[];
};

const Assets: FC<AssetsProps> = ({ images }) => {
    const length = images?.length || 0;
    const imagesNew = images || [];

    length < 4 &&
        [...Array(4 - length)].map(() =>
            imagesNew?.push({
                name: "empty picture",
                size: 2000,
                type: "image",
                extension: "JPG",
                src: "",
            }),
        );
    return (
        <div className="tw-border-black-20 tw-grid tw-grid-cols-2 tw-gap-0.5">
            {imagesNew?.slice(0, 4).map((image, index) => {
                const rounded = index === 0 ? "tw-rounded-tl" : index === 2 && "tw-rounded-bl";
                return (
                    <div
                        key={image.name}
                        style={{
                            backgroundImage: `url(${image.src || ""})`,
                        }}
                        className={`${rounded} tw-h-14 tw-w-14 tw-bg-grey-20`}
                    />
                );
            })}
        </div>
    );
};
