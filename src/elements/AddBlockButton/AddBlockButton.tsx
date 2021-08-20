/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, FC } from "react";
import { IconSize } from "@elements/Icon/IconSize";
import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";
import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";

export enum AddBlockButtonDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type AddBlockButtonProps = {
    onClick: (event: MouseEvent) => void;
    title?: string;
    orientation?: AddBlockButtonDirection;
};

export const AddBlockButton: FC<AddBlockButtonProps> = ({
    onClick,
    title,
    orientation = AddBlockButtonDirection.Horizontal,
}) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <button
            {...focusProps}
            title={title}
            onClick={onClick}
            data-test-id="add-block-button"
            className={merge([
                `tw-group tw-leading-none tw-rounded-sm tw-outline-none`,
                isFocusVisible && FOCUS_STYLE,
                orientation === AddBlockButtonDirection.Vertical ? "tw-rotate-90" : "",
            ])}
        >
            <span
                className={`tw-text-white tw-bg-violet-60 tw-rounded tw-inline-flex tw-items-center tw-w-7 tw-h-6 tw-relative tw-p-1 tw-transition-colors hover:tw-bg-violet-70 group-active:tw-bg-violet-90`}
                style={{
                    clipPath: `path(
                        "M27.3333 10.9369L21.7246 2C20.5 0.5 19.5 0 18 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H18C19.5 24 20.5 23.5 21.7246 22L27.3333 13.0631C27.7412 12.4131 27.7412 11.5869 27.3333 10.9369Z"
                    )`,
                }}>

                <IconAddSimple size={IconSize.Size16} />
            </span>
        </button>
    );
};
