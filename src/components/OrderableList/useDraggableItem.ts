/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItemProps, DraggableItemResult, useDrag } from "@react-aria/dnd";
import { DraggableCollectionState } from "@react-stately/dnd";

export const useDraggableItem = (props: DraggableItemProps, state: DraggableCollectionState): DraggableItemResult => {
    const { dragProps, dragButtonProps } = useDrag({
        getAllowedDropOperations() {
            return ["move"];
        },
        getItems() {
            return state.getItems(props.key);
        },
        renderPreview() {
            return state.renderPreview(props.key);
        },
        onDragStart(e) {
            state.startDrag(props.key, e);
        },
        onDragMove(e) {
            state.moveDrag(e);
        },
        onDragEnd(e) {
            state.endDrag(e);
        },
    });

    const item = state.collection.getItem(props.key);

    const ariaLabel = `Drag ${item.textValue}`;

    return {
        dragProps,
        dragButtonProps: {
            ...dragButtonProps,
            "aria-label": ariaLabel,
        },
    };
};
