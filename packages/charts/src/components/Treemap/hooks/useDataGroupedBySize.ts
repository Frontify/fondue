/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isEqual } from 'lodash-es';
import { useMemo } from 'react';

import {
    getDataPointsToBeGrouped,
    getFirstLevelGroups,
    getSecondLevelGroups,
} from '@components/Treemap/hooks/helpers/dataGroupingHelper';
import { type ColorLabelMap, type TreemapDataPoint } from '@components/Treemap/types';

import { usePrevious } from '../../../hooks/usePrevious';

export const useDataGroupedBySize = (
    data: TreemapDataPoint[],
    sizeThreshold: null | number,
    groupColorLabelMap?: ColorLabelMap,
) => {
    const previousData = usePrevious(data);
    const didDataChange = !isEqual(data, previousData) && previousData !== undefined;

    const result = useMemo(() => {
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

            return {
                groupedData: [...unchanged, ...groupsFirstLevel, ...groupsSecondLevel],
                wasGrouped: true,
            };
        }

        return {
            groupedData: data,
            wasGrouped: false,
        };
    }, [data, sizeThreshold, groupColorLabelMap, didDataChange]);

    return result;
};
