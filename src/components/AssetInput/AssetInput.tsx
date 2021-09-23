/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenu, ActionMenuProps } from "@components/Menu/ActionMenu/ActionMenu";
import { Button, ButtonStyle } from "@elements/Button/Button";
import IconAudio from "@elements/Icon/Generated/IconAudio";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconImageLibrary from "@elements/Icon/Generated/IconImageLibrary";
import IconUploadAlternative from "@elements/Icon/Generated/IconUploadAlternative";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useButton } from "@react-aria/button";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useMenuTrigger } from "@react-aria/menu";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
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
    alt?: undefined;
    icon?: undefined;
    size: number;
};

type ImageAsset = BaseAsset & {
    type: "image" | "logo";
    extension: string;
    src: string;
    alt?: string;
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

type AssetProps = {
    asset:
        | (ImageAsset & UploadSource)
        | (ImageAsset & LibrarySource)
        | (IconAsset & UploadSource)
        | (IconAsset & LibrarySource)
        | (OtherAsset & UploadSource)
        | (OtherAsset & LibrarySource);
    size: AssetInputSize;
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

const AssetThumbnail: FC<Pick<AssetProps, "asset" | "size"> & { isActive?: boolean }> = ({ asset, size, isActive }) => (
    <span
        className={merge([
            "tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-black-5 dark:tw-bg-black-95",
            size === AssetInputSize.Large
                ? "tw-w-full tw-h-32"
                : "tw-w-14 tw-h-full tw-border-r tw-border-black-opacity-25",
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
    </span>
);

const AssetSubline: FC<Pick<AssetProps, "asset">> = ({ asset }) => (
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
    const menuId = useMemoizedId();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const menuState = useMenuTriggerState({ closeOnSelect: true });
    const { isOpen, focusStrategy } = menuState;
    const { menuTriggerProps } = useMenuTrigger({}, menuState, buttonRef);
    const { buttonProps } = useButton(menuTriggerProps, buttonRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const { overlayProps } = useOverlay(
        { onClose: () => menuState.close(), shouldCloseOnBlur: true, isOpen, isDismissable: true },
        overlayRef,
    );

    return (
        <div className="tw-relative tw-w-full tw-font-sans tw-text-s tw-bg-transparent">
            <button
                {...mergeProps(buttonProps, focusProps)}
                ref={buttonRef}
                className={merge([
                    "tw-w-full tw-flex tw-flex-row tw-flex-wrap tw-border tw-rounded tw-overflow-hidden hover:tw-border-black-90 dark:hover:tw-border-black-40 tw-group focus-visible:tw-outline-none",
                    size === AssetInputSize.Large ? "tw-h-[11.5rem]" : "tw-h-14",
                    isOpen || isFocusVisible
                        ? "tw-border-black-90 dark:tw-border-black-10"
                        : "tw-border-black-20 dark:tw-border-black-80",
                    isFocusVisible && FOCUS_STYLE,
                ])}
            >
                <AssetThumbnail asset={asset} size={size} isActive={isOpen || isFocusVisible} />
                <span
                    className={merge([
                        "tw-py-3 tw-pr-3 tw-pl-4 tw-flex tw-flex-col tw-items-start tw-font-normal tw-flex-1",
                        size === AssetInputSize.Large ? "tw-h-14" : "tw-h-full",
                    ])}
                >
                    <span
                        className={merge([
                            "tw-text-black-100 tw-text-s dark:tw-text-white",
                            (isOpen || isFocusVisible) && "tw-font-medium",
                        ])}
                    >
                        {asset.name}
                    </span>
                    <AssetSubline asset={asset} />
                </span>
                <span
                    className={merge([
                        "tw-p-4 tw-flex tw-items-center",
                        size === AssetInputSize.Large ? "tw-h-14" : "tw-h-full",
                    ])}
                >
                    <span
                        className={merge([
                            "tw-transition-transform",
                            isOpen ? "tw-rotate-180 tw-text-black-90" : "tw-text-black-60",
                        ])}
                    >
                        <IconCaretDown size={IconSize.Size16} />
                    </span>
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-box-border tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2"
                        key={`asset-input-menu-${menuId}`}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div {...overlayProps} ref={overlayRef}>
                                <DismissButton onDismiss={() => menuState.close()} />
                                <ActionMenu menuBlocks={actions} focus={focusStrategy} />
                                <DismissButton onDismiss={() => menuState.close()} />
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
    size = AssetInputSize.Small,
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
