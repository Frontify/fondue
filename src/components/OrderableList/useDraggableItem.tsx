/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableItemProps, DraggableItemResult, useDrag } from "@react-aria/dnd";
import { DraggableCollectionState } from "@react-stately/dnd";

<<<<<<< HEAD
export const useDraggableItem = (props: DraggableItemProps, state: DraggableCollectionState): DraggableItemResult => {
=======
export function useDraggableItem(props: DraggableItemProps, state: DraggableCollectionState): DraggableItemResult {
>>>>>>> 2c0c0c592d43d28dda067826563c0b8a2422f9d4
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

    return {
        dragProps,
        dragButtonProps: {
            ...dragButtonProps,
        },
    };
<<<<<<< HEAD
};
=======
}
>>>>>>> 2c0c0c592d43d28dda067826563c0b8a2422f9d4
