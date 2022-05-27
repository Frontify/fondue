import { DraggableItem, DropZonePosition, moveItems } from '@utilities/dnd';
import { TreeFlatListItem } from '@components/Tree';

export const getReorderedNodes = (
    sourceItemId: string,
    targetParentId: NullableString,
    positionBeforeId: NullableString,
    nodes: DraggableItem<TreeFlatListItem>[],
) => {
    const sameLevelNodes = nodes.filter((node) => node.parentId === targetParentId);
    const sourceItem = nodes.filter((item) => item.id === sourceItemId)[0];
    const targetItemIndex = sameLevelNodes.findIndex((item) => item.id === positionBeforeId);
    const position = targetItemIndex === -1 ? DropZonePosition.After : DropZonePosition.Before;

    return moveItems<TreeFlatListItem>(
        sameLevelNodes.at(targetItemIndex) as DraggableItem<TreeFlatListItem>,
        { ...sourceItem, parentId: targetParentId, sort: null },
        position,
        sameLevelNodes,
    );
};
