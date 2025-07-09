/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LABEL_PERCENTAGE_STYLE, LABEL_TITLE_STYLE, LABEL_VALUE_STYLE } from '@components/PieChart/components/consts';
import { getSVGTextDimensions } from '@components/common/helpers';
import { useEffect, useState } from 'react';

type Widths = {
    labelWidth: number;
    valueWidth: number;
    percentageWidth: number;
};

export const useTextWidths = (label: string, value: string, percentage: string) => {
    const [widths, setWidths] = useState<Widths>({ labelWidth: 0, valueWidth: 0, percentageWidth: 0 });

    useEffect(() => {
        const labelWidth = getSVGTextDimensions(label, LABEL_TITLE_STYLE).width ?? 0;
        const valueWidth = getSVGTextDimensions(value, LABEL_VALUE_STYLE).width ?? 0;
        const percentageWidth = getSVGTextDimensions(percentage, LABEL_PERCENTAGE_STYLE).width ?? 0;
        setWidths({ labelWidth, valueWidth, percentageWidth });
    }, [label, value, percentage]);

    return widths;
};
