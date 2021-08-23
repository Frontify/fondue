/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenu, ActionMenuProps } from "@components/Menu/ActionMenu/ActionMenu";
import { Button, ButtonStyle } from "@elements/Button/Button";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconImageLibrary from "@elements/Icon/Generated/IconImageLibrary";
import IconUploadAlternative from "@elements/Icon/Generated/IconUploadAlternative";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useMenuTrigger } from "@react-aria/menu";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { useMenuTriggerState } from "@react-stately/menu";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import React, { cloneElement, FC, ReactElement, useRef } from "react";

type BaseAsset = {
    name: string;
};

type OtherAsset = BaseAsset & {
    type: "audio";
    extension: string;
    src?: undefined;
    icon?: undefined;
    size: number;
};

type ImageAsset = BaseAsset & {
    type: "image" | "logo";
    extension: string;
    src: string;
    icon?: undefined;
    size: number;
};

type IconAsset = BaseAsset & {
    type: "icon";
    extension?: undefined;
    src?: undefined;
    icon: ReactElement<IconProps>;
    size?: undefined;
};

type UploadSource = { source: "upload"; sourceName?: undefined };
type LibrarySource = { source: "library"; sourceName: string };

type AssetProps = {
    asset:
        | (ImageAsset & UploadSource)
        | (ImageAsset & LibrarySource)
        | (IconAsset & UploadSource)
        | (IconAsset & LibrarySource)
        | (OtherAsset & UploadSource)
        | (OtherAsset & LibrarySource);
    size: "small" | "large";
    actions: ActionMenuProps["menuBlocks"];
};

export type AssetInputProps =
    | (AssetProps & {
          onUploadClick?: undefined;
          onLibraryClick?: undefined;
      })
    | {
          asset?: undefined;
          actions?: undefined;
          size?: undefined;
          onUploadClick: () => void;
          onLibraryClick?: () => void;
      };

const AssetSubline: FC<Pick<AssetProps["asset"], "source" | "sourceName" | "extension" | "size">> = (asset) => (
    <span className="tw-flex tw-flex-row tw-items-center tw-gap-1 tw-text-black-80 tw-text-xxs">
        {asset.source === "library" ? (
            <>
                <IconImageLibrary />
                <span>{asset.sourceName}</span>
            </>
        ) : (
            <>
                <IconUploadAlternative />
                <span>Uploaded</span>
            </>
        )}
        {asset.extension && (
            <>
                <span className="tw-text-m tw-text-black-20 tw-h-4 tw-flex tw-items-center">•</span>
                <span>{asset.extension}</span>
            </>
        )}
        {asset.size && (
            <>
                <span className="tw-text-m tw-text-black-20 tw-h-4 tw-flex tw-items-center">•</span>
                <span>{asset.size}</span>
            </>
        )}
    </span>
);

const SelectedAsset: FC<AssetProps> = ({ asset, size, actions }) => {
    const menu = useMenuTriggerState({ closeOnSelect: true });
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { menuTriggerProps } = useMenuTrigger({}, menu, buttonRef);
    const { buttonProps } = useButton(menuTriggerProps, buttonRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { onClose: () => menu.close(), shouldCloseOnBlur: true, isOpen: menu.isOpen, isDismissable: true },
        overlayRef,
    );
    const { isOpen } = menu;

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s">
            <button
                {...buttonProps}
                {...focusProps}
                ref={buttonRef}
                className={merge([
                    "tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-border tw-rounded hover:tw-border-black-90 tw-group focus-visible:tw-outline-none",
                    size === "large" ? "tw-h-[11.5rem]" : "tw-h-14",
                    isOpen || isFocusVisible ? "tw-border-black-90" : "tw-border-black-20",
                    isFocusVisible && FOCUS_STYLE,
                ])}
            >
                <span
                    className={merge([
                        size === "large"
                            ? "tw-w-full tw-h-32"
                            : "tw-w-14 tw-h-full tw-border-r tw-border-black-opacity-25 tw-rounded-l",
                        "tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-black-5 group-hover:tw-text-black-100",
                        isOpen || isFocusVisible ? "tw-text-black-100" : "tw-text-black-80",
                    ])}
                >
                    {asset.type === "icon" ? (
                        cloneElement(asset.icon, { size: IconSize.Size24 })
                    ) : asset.type === "audio" ? (
                        <IconAudio size={IconSize.Size24} />
                    ) : (
                        <img src={asset.src} alt="" className="tw-max-h-full" />
                    )}
                </span>
                <span
                    className={merge([
                        size === "large" ? "tw-h-14" : "tw-h-full",
                        "tw-py-3 tw-pr-3 tw-pl-4 tw-flex tw-flex-col tw-items-start tw-font-normal tw-flex-1",
                    ])}
                >
                    <span
                        className={merge([
                            "tw-text-black-100 tw-text-s group-hover:tw-font-medium",
                            (isOpen || isFocusVisible) && "tw-font-medium",
                        ])}
                    >
                        {asset.name}
                    </span>
                    <AssetSubline
                        source={asset.source}
                        sourceName={asset.sourceName}
                        extension={asset.extension}
                        size={asset.size}
                    />
                </span>
                <span className={merge([size === "large" ? "tw-h-14" : "tw-h-full", "tw-p-3 tw-flex tw-items-center"])}>
                    <span className={merge(["tw-transition-transform", isOpen && "tw-rotate-180"])}>
                        <IconCaretDown size={IconSize.Size16} />
                    </span>
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-box-border tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div {...overlayProps} ref={overlayRef}>
                                <DismissButton onDismiss={() => close()} />
                                <ActionMenu menuBlocks={actions} focus={menu.focusStrategy} />
                                <DismissButton onDismiss={() => close()} />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const AssetInput: FC<AssetInputProps> = ({
    asset,
    actions = [],
    size = "small",
    onLibraryClick,
    onUploadClick,
}) => {
    if (asset) {
        return <SelectedAsset asset={asset} size={size} actions={actions} />;
    }

    return (
        <div
            data-test-id="asset-input-placeholder"
            className={merge([
                "tw-grid tw-p-3 tw-border tw-border-dashed tw-border-black-10 tw-rounded",
                onLibraryClick ? "tw-grid-cols-2 tw-divide-x tw-divide-black-10" : "tw-grid-cols-1",
            ])}
        >
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
            {onLibraryClick && (
                <div className="tw-flex tw-flex-col tw-h-8 tw-pl-3">
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
