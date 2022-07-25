import { DraggableItem, DropZonePosition, moveItems } from '@utilities/dnd';
import { TreeFlatListItem } from '@components/Tree';

export const getReorderedNodes = (
    sourceItemId: string,
    targetParentId: NullableString,
    positionBeforeId: NullableString,
    nodes: DraggableItem<TreeFlatListItem>[],
) => {
    const sameLevelNodes = nodes.filter((node) => node.parentId === targetParentId);
    const sourceItem = nodes.find((item) => item.id === sourceItemId);
    const targetItemIndex = sameLevelNodes.findIndex((item) => item.id === positionBeforeId);
    const position = targetItemIndex === -1 ? DropZonePosition.After : DropZonePosition.Before;

    return sourceItem
        ? moveItems<TreeFlatListItem>(
              sameLevelNodes[targetItemIndex < 0 ? sameLevelNodes.length + targetItemIndex : targetItemIndex],
              { ...sourceItem, parentId: targetParentId, sort: null },
              position,
              sameLevelNodes,
          )
        : [...nodes];
};
