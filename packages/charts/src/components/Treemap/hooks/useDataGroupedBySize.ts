/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isEqual } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import {
    getDataPointsToBeGrouped,
    getFirstLevelGroups,
    getSecondLevelGroups,
} from '@components/Treemap/hooks/helpers/dataGroupingHelper';
import { type ColorLabelMap, type TreemapDataPoint, type TreemapDataPointGroup } from '@components/Treemap/types';

import { usePrevious } from '../../../hooks/usePrevious';

export const useDataGroupedBySize = (
    data: TreemapDataPoint[],
    sizeThreshold: null | number,
    groupColorLabelMap?: ColorLabelMap,
) => {
    const [groupedData, setGroupedData] = useState<(TreemapDataPoint | TreemapDataPointGroup)[]>(data);
    const wasGrouped = useRef(false);
    const previousData = usePrevious(data);
    const didDataChange = !isEqual(data, previousData) && previousData !== undefined;

    if (didDataChange && !!sizeThreshold) {
        // eslint-disable-next-line react-hooks/refs
        wasGrouped.current = false;
    }

    useEffect(() => {
        if ((sizeThreshold && sizeThreshold > 0) || didDataChange) {
            const { unchanged, toBeGroupedFirstLevel, toBeGroupedSecondLevel } = getDataPointsToBeGrouped(
                data,
                sizeThreshold,
            );

            const groupsFirstLevel = getFirstLevelGroups(toBeGroupedFirstLevel);

            const groupsSecondLevel = getSecondLevelGroups(
                toBeGroupedSecondLevel,
                groupsFirstLevel,
                groupColorLabelMap,
            );

            wasGrouped.current = true;

            setGroupedData([...unchanged, ...groupsFirstLevel, ...groupsSecondLevel]);
        }
    }, [data, sizeThreshold, groupColorLabelMap]);

    // eslint-disable-next-line react-hooks/refs
    return { groupedData, wasGrouped: wasGrouped.current };
};
