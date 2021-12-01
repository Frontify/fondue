/* (c) Copyright Frontify Ltd., all rights reserved. */
import { useDropIndicator } from "@react-aria/dnd";
import { useVisuallyHidden } from "@react-aria/visually-hidden";
import { DroppableCollectionState } from "@react-stately/dnd";
import { ItemDropTarget } from "@react-types/shared";
import React, { FC, useRef, RefObject } from "react";

type InsertionIndicatorProps = {
    key: string;
    collectionRef: RefObject<HTMLDivElement>;
    target: ItemDropTarget;
    dropState: DroppableCollectionState;
};

export const InsertionIndicator: FC<InsertionIndicatorProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { dropIndicatorProps } = useDropIndicator(props, props.dropState, ref);
    const { visuallyHiddenProps } = useVisuallyHidden();

    // If aria-hidden, we are either not in a drag session or the drop target is invalid.
    // In that case, there's no need to render anything at all unless we need to show the indicator visually.
    // This can happen when dragging using the native DnD API as opposed to keyboard dragging.
    if (!props.dropState.isDropTarget(props.target) && dropIndicatorProps["aria-hidden"]) {
        return null;
    }

    return (
        <div role="row" aria-hidden={dropIndicatorProps["aria-hidden"]} style={{ zIndex: 2, position: "relative" }}>
            <div
                role="gridcell"
                aria-selected="false"
                style={{
                    width: "100%",
                    marginLeft: 0,
                    height: 2,
                    marginBottom: -2,
                    outline: "none",
                }}
                className={props.dropState.isDropTarget(props.target) ? "tw-bg-violet-60" : ""}
            >
                <div {...visuallyHiddenProps} role="button" {...dropIndicatorProps} ref={ref} />
            </div>
        </div>
    );
};
