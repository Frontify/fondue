import { DraggableItem, DropZonePosition, moveItems } from '@utilities/dnd';
import { TreeFlatListItem } from '@components/Tree';

export const getReorderedNodes = (
    targetItem: DraggableItem<TreeFlatListItem>,
    sourceItem: DraggableItem<TreeFlatListItem>,
    position: DropZonePosition,
    nodes: DraggableItem<TreeFlatListItem>[],
) => {
    const parentId = position === DropZonePosition.Within ? targetItem.id : targetItem.parentId;
    const sameLevelNodes = nodes.filter((node) => node.parentId === parentId);

    return moveItems(targetItem, { ...sourceItem, parentId, sort: null }, position, sameLevelNodes);
};
