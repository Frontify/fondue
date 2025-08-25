/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColorLabelMap, type TreemapDataPoint, type TreemapDataPointGroup } from '@components/Treemap/types';

export const getDataPointsToBeGrouped = (data: TreemapDataPoint[], sizeThreshold: number | null) => {
    const unchanged: TreemapDataPoint[] = [];
    const toBeGroupedSecondLevel: TreemapDataPoint[] = [];
    const toBeGroupedFirstLevel: TreemapDataPoint[] = [];
    for (const dataPoint of data) {
        const parentDataPoint = data.find((parent) => parent.id === dataPoint.parentId);
        const isFirstLevelDataPoint = parentDataPoint?.parentId === null;
        let value = dataPoint.value ?? 0;

        if (isFirstLevelDataPoint) {
            const children = data.filter((possibleChild) => possibleChild.parentId === dataPoint.id);
            value =
                children.reduce((sum, child) => {
                    return sum + (child.value ?? 0);
                }, 0) ?? 0;

            if (value > (sizeThreshold || 0)) {
                unchanged.push(dataPoint);
            } else {
                toBeGroupedFirstLevel.push(dataPoint);
            }
        } else {
            if (value > (sizeThreshold || 0) || dataPoint.parentId === null) {
                unchanged.push(dataPoint);
            } else {
                toBeGroupedSecondLevel.push(dataPoint);
            }
        }
    }

    return {
        unchanged,
        toBeGroupedFirstLevel,
        toBeGroupedSecondLevel,
    };
};

export const getFirstLevelGroups = (data: TreemapDataPoint[]) => {
    const groupsFirstLevel = data.reduce((acc: Record<string, TreemapDataPointGroup>, dataPoint) => {
        const key = `group-${dataPoint.color}`;
        const group = acc[key];

        acc[key] = addDataPointToGroup(dataPoint, key, group, undefined, key);

        return acc;
    }, {});

    return Object.values(groupsFirstLevel);
};

export const getSecondLevelGroups = (
    data: TreemapDataPoint[],
    groupsFirstLevel: TreemapDataPointGroup[],
    colorLabelMap?: ColorLabelMap,
) => {
    const groupsSecondLevel = data.reduce((acc: Record<string, TreemapDataPointGroup>, dataPoint) => {
        const parentGroup = groupsFirstLevel.find(
            (parent) => dataPoint.parentId && parent.groupIds?.includes(dataPoint.parentId),
        );
        const key = parentGroup
            ? `group-${parentGroup.color}-${dataPoint.color}`
            : `group-${dataPoint.parentId}-${dataPoint.color}`;
        const existingGroup = acc[key];

        const labelGetter = colorLabelMap?.[dataPoint.color || '']?.group;
        const hasGrouping = existingGroup && existingGroup.groupIds && existingGroup.groupIds.length > 0;
        const label = hasGrouping ? labelGetter?.((existingGroup.groupIds?.length || 0) + 1) : dataPoint.label;

        acc[key] = addDataPointToGroup(dataPoint, key, existingGroup, parentGroup, label);

        return acc;
    }, {});

    return Object.values(groupsSecondLevel);
};

const addDataPointToGroup = (
    dataPoint: TreemapDataPoint,
    groupId: string,
    group?: TreemapDataPointGroup,
    parentGroup?: TreemapDataPoint,
    label?: string,
): TreemapDataPointGroup => {
    if (group) {
        return {
            ...group,
            label: label || group.label,
            value: (group.value ?? 0) + (dataPoint.value ?? 0),
            groupIds: [...(group.groupIds || []), dataPoint.id],
        };
    } else {
        return {
            ...dataPoint,
            id: groupId,
            description: '',
            groupIds: [dataPoint.id],
            parentId: parentGroup ? `group-${parentGroup.color}` : dataPoint.parentId,
        };
    }
};
