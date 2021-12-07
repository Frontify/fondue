/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDropIndicator } from "@react-aria/dnd";
import { useVisuallyHidden } from "@react-aria/visually-hidden";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";
import { InsertionIndicatorProps } from "./types";

export const InsertionIndicator: FC<InsertionIndicatorProps> = (props) => {
    const { dropState, target } = props;
    const ref = useRef<HTMLDivElement | null>(null);
    const { dropIndicatorProps } = useDropIndicator(props, dropState, ref);
    const { visuallyHiddenProps } = useVisuallyHidden();

    // If aria-hidden, we are either not in a drag session or the drop target is invalid.
    // In that case, there's no need to render anything at all unless we need to show the indicator visually.
    // This can happen when dragging using the native DnD API as opposed to keyboard dragging.
    if (!dropState.isDropTarget(target) && dropIndicatorProps["aria-hidden"]) {
        return null;
    }

    return (
        <div role="row" aria-hidden={dropIndicatorProps["aria-hidden"]} className="tw-z-20 tw-relative">
            <div
                role="gridcell"
                aria-selected="false"
                className={merge([
                    "tw-w-100 tw-ml-0 tw-h-[2px] tw-mb-[-2px] tw-outline-none",
                    dropState.isDropTarget(target) && "tw-bg-violet-60",
                ])}
                data-test-id="visual-insertion-indicator"
                data-drop-target={dropState.isDropTarget(target)}
            >
                <div
                    {...visuallyHiddenProps}
                    role="button"
                    {...dropIndicatorProps}
                    ref={ref}
                    data-test-id="insertion-indicator"
                />
            </div>
        </div>
    );
};
