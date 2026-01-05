/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import { LABEL_PERCENTAGE_STYLE, LABEL_TITLE_STYLE, LABEL_VALUE_STYLE } from '@components/PieChart/components/consts';
import { getSVGTextDimensions } from '@components/common/helpers';

export const useTextWidths = (label: string, value: string, percentage: string) => {
    const widths = useMemo(() => {
        const labelWidth = getSVGTextDimensions(label, LABEL_TITLE_STYLE).width ?? 0;
        const valueWidth = getSVGTextDimensions(value, LABEL_VALUE_STYLE).width ?? 0;
        const percentageWidth = getSVGTextDimensions(percentage, LABEL_PERCENTAGE_STYLE).width ?? 0;
        return { labelWidth, valueWidth, percentageWidth };
    }, [label, value, percentage]);

    return widths;
};
