/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MISSING_DATA_SERIES_KEY_SUFFIX } from '@components/LineChart/consts';

export const isNoDataKey = (key: string) => key.includes(MISSING_DATA_SERIES_KEY_SUFFIX) || key.includes('white-gap');
