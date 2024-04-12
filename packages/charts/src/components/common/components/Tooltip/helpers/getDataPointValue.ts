/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ValueFormatter } from '@components/common/types';

export const getDataPointValue = (noValueLabel: string, value?: number | null, valueFormatter?: ValueFormatter) => {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return noValueLabel;
    }
    return valueFormatter ? valueFormatter(value) : value;
};
