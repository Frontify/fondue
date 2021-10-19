/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContent } from "@components/Menu/MenuItem/MenuItemContent";
import IconColors from "@elements/Icon/Generated/IconColors";
import { IconSize } from "@elements/Icon/IconSize";
import { useMemoizedId } from "@hooks/useMemoizedId";
import { useFocusRing } from "@react-aria/focus";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { Trigger } from "../../elements/Trigger/Trigger";
import { ColorInputFlyoutProps } from "./ColorInputFlyout";

type ColorInputTriggerProps = Pick<ColorInputFlyoutProps, "id" | "currentColor" | "disabled"> & {
    isOpen?: boolean;
};

export const ColorInputTrigger: FC<ColorInputTriggerProps> = ({
    id,
    currentColor,
    isOpen = false,
    disabled = false,
}) => {
    const selectedColor = currentColor?.hex;
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <Trigger isOpen={isOpen} disabled={disabled} isFocusVisible={isFocusVisible}>
            <button
                {...focusProps}
                id={useMemoizedId(id)}
                className={merge([
                    "tw-overflow-hidden tw-flex-auto tw-h-full tw-rounded tw-text-left tw-outline-none tw-py-1 tw-px-3",
                    !currentColor && "tw-text-black-60",
                    disabled && "tw-text-black-40",
                ])}
            >
                <MenuItemContent
                    title={currentColor ? currentColor.name || currentColor.hex : "Select color"}
                    decorator={
                        selectedColor ? (
                            <span
                                className={merge([
                                    "tw-h-4 tw-w-4 tw-rounded tw-flex tw-items-center tw-justify-center",
                                    disabled && "tw-opacity-50",
                                ])}
                                style={{ background: selectedColor }}
                            />
                        ) : (
                            <span className="tw-text-black-70">
                                <IconColors size={IconSize.Size12} />
                            </span>
                        )
                    }
                />
            </button>
        </Trigger>
    );
};
